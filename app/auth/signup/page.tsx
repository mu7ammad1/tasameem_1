import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Input } from "@nextui-org/input";

import { createClient } from "@/utils/supabase/server";

import { SubmitButton } from "./submit-button";

export default async function Signup({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const full_name = formData.get("full_name") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }
    // Function to remove Arabic diacritics
    const removeDiacritics = (text: string) => {
      return text.normalize("NFD").replace(/[\u064B-\u065F]/g, "");
    };
    // Generate a unique username
    const generateUsername = (name: string) => {
      const cleanedName = removeDiacritics(name)
        .replace(/[^\w\s]|_/g, "")
        .replace(/\s+/g, "");
      const randomSuffix = Math.floor(100 + Math.random() * 900); // Generates a number between 100 and 999

      return `${cleanedName}${randomSuffix}`;
    };
    // إضافة إنشاء الملف الشخصي هنا بعد التسجيل بنجاح
    const { user } = data;
    const username = generateUsername(full_name.substring(0, 6).toLowerCase());

    if (user) {
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: user.id,
          full_name: full_name,
          username: username,
        },
      ]);

      if (profileError) {
        console.error("Error creating profile:", profileError);

        return redirect("/login?message=Could not create profile");
      }
    }

    return redirect("/continue");
  };

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return !user ? (
    <div className="flex flex-row-reverse w-full justify-center items-start">
      <form className="flex flex-col w-2/5 max-sm:w-full max-md:w-3/4 max-lg:w-4/6 justify-center gap-y-2 text-foreground">
        <div className="flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-y-4">
          <Input
            isClearable
            color="default"
            label="full name"
            name="full_name"
            placeholder="Enter your full name"
            type="text"
            variant={"bordered"}
          />
          <Input
            isClearable
            color="default"
            label="Email"
            name="email"
            placeholder="Enter your Email"
            type="email"
            variant={"bordered"}
          />
          <Input
            isClearable
            color="default"
            label="Password"
            name="password"
            placeholder="Enter your Password"
            type="password"
            variant={"bordered"}
          />
        </div>
        <SubmitButton
          className={`mt-5`}
          formAction={signUp}
          pendingText="جاري تسجيل جديد...."
          variant={"flat"}
        >
          تسجيل حساب جديد
        </SubmitButton>
        <span className="text-center text-xs font-extralight">
          بالمتبعة انت توافق علي سياسة الاستخدام و الملكية الابداعية
        </span>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  ) : (
    redirect(`/continue`)
  );
}
