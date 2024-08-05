import dynamic from "next/dynamic";
import { Button } from "@nextui-org/button";

import { title } from "@/components/primitives";
import CardProf from "@/components/ui/CardProf";
import { createClient } from "@/utils/supabase/server";
import PopoverUi from "@/components/ui/PopoverUi";
import IsFollowSmall from "@/components/ui/isFollowSmall";
import Isloved from "@/components/ui/isloved";

const SectionBady = dynamic(() => import("@/components/ui/SectionBady"), {
  ssr: true,
  loading: () => <p>Loading...</p>,
});

const Previous = dynamic(() => import("@/components/ui/Previous"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: board } = await supabase
    .from("boards")
    .select(
      `id,created_at,boards,tags,background,title,profiles (id,username,full_name,avatar,bio),loves (love,board)`,
    )
    .eq("id", params.slug)
    .single();

  // إذا كانت profiles مصفوفة
  const profile: any = board?.profiles;

  return (
    <main
      className={`w-full flex justify-center items-center flex-1 flex-col gap-5 tracking-widest`}
    >
      <div className="w-full flex justify-start items-center max-w-4xl text-left z-10">
        <h1 className="text-3xl font-medium" dir="auto">
          {board?.title}
        </h1>
      </div>
      <section className="flex justify-between items-center gap-3 w-full max-w-4xl sticky top-0 z-10 bg-background/50 backdrop-blur-lg px-2 py-2">
        <div
          className={title({
            className: `flex justify-center items-center gap-3 *:tracking-wide`,
          })}
        >
          <PopoverUi
            avatar={profile?.avatar}
            bio={profile?.bio}
            followerId={user?.id}
            followingId={profile?.id}
            full_name={profile?.full_name}
            userId={user?.id}
            username={profile?.username}
          />
          <IsFollowSmall followerId={user?.id} followingId={profile?.id} />
        </div>
        <div
          className={title({
            className: `flex justify-center items-center gap-3 max-sm:hidden`,
          })}
        >
          <Isloved followingId={user?.id} isboard={board?.id} />
          <Button
            isIconOnly
            aria-label="Like"
            color="default"
            radius="full"
            variant="ghost"
          >
            <svg
              className="size-5 stroke-foreground-900 fill-none"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      </section>
      <section className="flex justify-center items-center gap-3 w-full max-w-4xl z-0">
        <SectionBady boards={board?.boards} />
      </section>
      <section className="flex justify-between items-center gap-3 w-full max-w-4xl z-0">
        <CardProf
          avatar={profile?.avatar}
          bio={profile?.bio}
          full_name={profile?.full_name}
          username={profile?.username}
        />
      </section>
      <section className="flex justify-between items-center gap-3 w-full max-w-4xl z-0">
        <Previous />
      </section>
    </main>
  );
}
