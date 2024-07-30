import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { SubmitButton } from "@/app/signup/submit-button";
import { bio, full_name, user, username } from "@/action/read";

export default function Profile({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const insert = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const username = formData.get("username") as string;
    const yourname = formData.get("yourname") as string;
    const bio = formData.get("bio") as string;
    const avatar = formData.get("avatar") as string;

    const supabase = createClient();

    const { data, error } = await supabase
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
        {full_name?.full_name === null || full_name?.full_name === undefined ? (
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
            defaultValue={`${full_name?.full_name}`}
            dir="rtl"
            name="yourname"
            placeholder="اسمك"
            type="text"
          />
        )}

        <label className="text-md text-right" htmlFor="password">
          (username) اسم المستخدم
        </label>
        {username?.username === null || username?.username === undefined ? (
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
            defaultValue={`${username?.username}`}
            dir="rtl"
            name="username"
            placeholder="(username) اسم المستخدم"
            type="text"
          />
        )}
        <label className="text-md text-right" htmlFor="password">
          !اخبر الناس عنك
        </label>

        {bio?.bio === null || bio?.bio === undefined ? (
          <textarea
            className="resize-none rounded-xl p-5 bg-inherit border mb-3 focus-visible:ring-emerald-500"
            dir="rtl"
            name="bio"
            placeholder="!اخبر الناس عنك"
          />
        ) : (
          <textarea
            className="resize-none rounded-xl p-5 bg-inherit border mb-3 focus-visible:ring-emerald-500"
            defaultValue={`${bio?.bio}`}
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
