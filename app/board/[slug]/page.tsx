import dynamic from "next/dynamic";
import { Button } from "@nextui-org/button";
import { User } from "@nextui-org/user";
import { Link as Links } from "@nextui-org/link";

import { title } from "@/components/primitives";
import CardProf from "@/components/ui/CardProf";

const SectionBady = dynamic(() => import("@/components/ui/SectionBady"), {
  ssr: true,
  loading: () => <p>Loading...</p>,
});

const Previous = dynamic(() => import("@/components/ui/Previous"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <main
      className={`w-full flex justify-center items-center flex-1 flex-col gap-5 tracking-widest`}
    >
      <div className="w-full flex justify-start items-center max-w-4xl text-left">
        <h1 className="text-3xl font-medium" dir="auto">
          Badge Week 2024: In The Rough Golf Apparel
        </h1>
      </div>
      <section className="flex justify-between items-center gap-3 w-full max-w-4xl sticky top-0 z-50 bg-background px-2 py-2">
        <div
          className={title({
            className: `flex justify-center items-center gap-3 *:tracking-wide`,
          })}
        >
          <User
            avatarProps={{
              src: "https://avatars.githubusercontent.com/u/30373425?v=4",
              className: "mr-2",
              alt: "profile avatar",
            }}
            description={
              <Links href="https://twitter.com/jrgarciadev" size="sm">
                Designer
              </Links>
            }
            name={
              <Links
                color="foreground"
                href="https://twitter.com/jrgarciadev"
                size="sm"
              >
                Junior Garcia
              </Links>
            }
          />
          <div className="flex justify-center items-center gap-5">
            <Button
              className="leading-8 tracking-widest font-medium"
              color="default"
              size="sm"
              variant="flat"
            >
              Follow
            </Button>
          </div>
        </div>
        <div
          className={title({
            className: `flex justify-center items-center gap-3`,
          })}
        >
          <div
            aria-label="Like"
            className="p-2 border-1 border-foreground-400 rounded-full hover:border-secondary duration-500 *:hover:fill-secondary *:hover:stroke-secondary"
          >
            <svg
              className="size-5 "
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            aria-label="Like"
            className="p-2 border-1 border-foreground-400 rounded-full hover:border-secondary duration-500 *:hover:fill-secondary *:hover:stroke-secondary"
          >
            <svg
              className="size-5 "
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
          </div>
          <div
            aria-label="Like"
            className="p-2 border-1 border-foreground-400 rounded-full hover:border-secondary duration-500 *:hover:fill-secondary *:hover:stroke-secondary"
          >
            <svg
              className="size-5 "
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>

      <section className="flex justify-between items-center gap-3 w-full max-w-4xl">
        <SectionBady />
      </section>
      <section className="flex justify-between items-center gap-3 w-full max-w-4xl">
        <CardProf />
      </section>
      <section className="flex justify-between items-center gap-3 w-full max-w-4xl">
        <Previous />
      </section>
    </main>
  );
}
