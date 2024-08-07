import { redirect } from "next/navigation";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { Button } from "@nextui-org/button";

import { createClient } from "@/utils/supabase/server";

import { SubmitButton } from "./submit-button";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/protected");
  };

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return !user ? (
    <div className="flex flex-row-reverse w-full justify-center items-start">
      <form className="flex flex-col w-2/5 max-sm:w-full max-md:w-3/4 max-lg:w-4/6 justify-center gap-y-2 text-foreground">
        <div className="flex flex-col w-full flex-wrap md:flex-nowrap mb-10 md:mb-0 gap-y-4">
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
          <span className="text-right">
            <Link className="text-blue-500" href="/hrml">
              لقد نسيت كملة المرور
            </Link>
          </span>
        </div>
        <SubmitButton
          className={`mt-3`}
          formAction={signIn}
          pendingText="جاري تسجيل الدخول...."
          variant={"flat"}
        >
          تسجيل الدخول
        </SubmitButton>
        <Link href={`/auth/signup`}>
          <Button className={`mt-5 w-full`} href="/" variant={"faded"}>
            تسجيل حساب جديد
          </Button>
        </Link>
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
