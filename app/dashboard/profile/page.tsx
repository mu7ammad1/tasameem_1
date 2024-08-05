import { redirect } from "next/navigation";
import { Input } from "@nextui-org/input";

import { createClient } from "@/utils/supabase/server";
import { SubmitButton } from "@/app/login/submit-button";

export default async function Profile({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const insert = async (formData: FormData) => {
    "use server";

    // const origin = headers().get("origin") as any
    const username = formData.get("username") as string;
    const yourname = formData.get("yourname") as string;
    const bio = formData.get("bio") as string;
    const avatar = formData.get("avatar") as string;

    const supabase = createClient();

    const { error } = await supabase
      .from("profiles")
      .upsert([
        {
          username: username,
          full_name: yourname,
          id: user?.id,
          bio: bio,
          avatar: avatar || `defualt`,
        },
      ])
      .select();

    if (error) {
      return redirect("/profile?message=Could not upsert data");
    }

    return redirect("/profile?message=لقد تم تحديث البيانات بنجاح");
  };

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: profile } = await supabase
    .from("profiles")
    .select("full_name,username,bio")
    .eq(`id`, user?.id)
    .limit(1)
    .single();

  return (
    <div className="flex justify-center items-start">
      <form className="flex flex-col w-2/5 justify-center gap-2 text-foreground">
        <label className="text-md text-right" htmlFor="email">
          بريد اكتروني
        </label>

        <input
          disabled
          className="rounded-xl p-5 bg-inherit border mb-3 disabled:opacity-100 focus-visible:ring-emerald-500"
          defaultValue={`${user?.email}`}
          dir="rtl"
          name="email"
          placeholder="بريد اكتروني"
          type="text"
        />
        <label className="text-md text-right" htmlFor="password">
          اسمك
        </label>
        {profile?.full_name === null || profile?.full_name === undefined ? (
          <input
            className="rounded-xl p-5 bg-inherit border mb-3 focus-visible:ring-emerald-500"
            dir="rtl"
            name="yourname"
            placeholder="اسمك"
            type="text"
          />
        ) : (
          <input
            className="rounded-xl p-5 bg-inherit border mb-3 focus-visible:ring-emerald-500"
            defaultValue={`${profile?.full_name}`}
            dir="rtl"
            name="yourname"
            placeholder="اسمك"
            type="text"
          />
        )}

        <label className="text-md text-right" htmlFor="password">
          (username) اسم المستخدم
        </label>
        {profile?.username === null || profile?.username === undefined ? (
          <input
            className="rounded-xl p-5 bg-inherit border mb-3 focus-visible:ring-emerald-500"
            dir="rtl"
            name="username"
            placeholder="(username) اسم المستخدم"
            type="text"
          />
        ) : (
          <input
            className="rounded-xl p-5 bg-inherit border mb-3 focus-visible:ring-emerald-500"
            defaultValue={`${profile?.username}`}
            dir="rtl"
            name="username"
            placeholder="(username) اسم المستخدم"
            type="text"
          />
        )}
        <label className="text-md text-right" htmlFor="password">
          !اخبر الناس عنك
        </label>

        {profile?.bio === null || profile?.bio === undefined ? (
          <textarea
            className="resize-none rounded-xl p-5 bg-inherit border mb-3 focus-visible:ring-emerald-500"
            dir="rtl"
            name="bio"
            placeholder="!اخبر الناس عنك"
          />
        ) : (
          <textarea
            className="resize-none rounded-xl p-5 bg-inherit border mb-3 focus-visible:ring-emerald-500"
            defaultValue={`${profile?.bio}`}
            dir="rtl"
            name="bio"
            placeholder="!اخبر الناس عنك"
          />
        )}

        <SubmitButton
          className="bg-green-500 rounded-xl p-2 text-foreground mb-2"
          formAction={insert}
          pendingText="تحديث البيانات..."
        >
          تحديث البيانات
        </SubmitButton>
      </form>
      {searchParams.message}
    </div>
  );
}
