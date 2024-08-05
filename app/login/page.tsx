import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Input } from "@nextui-org/input";
import Link from "next/link";

import { createClient } from "@/utils/supabase/server";

import { SubmitButton } from "./submit-button";
import GoogleSVG from "./GoogleSVG";
import GithubSVG from "./GithubSVG";

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
      return redirect("/signup?message=Could not authenticate user");
    }

    return redirect("/protected");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/signup?message=Could not authenticate user");
    }

    return redirect("/signup?message=Check email to continue sign in process");
  };
  const signInWithGithub = async () => {
    "use server";

    const origin = headers().get("origin");
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (data.url) {
      redirect(data.url);
    }

    if (error) {
      return redirect("/signup?message=Could not authenticate user");
    }

    return redirect("/signup?message=Check email to continue sign in process");
  };
  const signInWithGoogle = async () => {
    "use server";

    const origin = headers().get("origin");
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (data.url) {
      redirect(data.url);
    }

    if (error) {
      return redirect("/signup?message=Could not authenticate user");
    }

    return redirect("/signup?message=Check email to continue sign in process");
  };
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return !user ? (
    <div className="flex flex-row-reverse w-full px-8 justify-center gap-2 items-start h-screen">
      <form className="flex flex-col w-2/5 max-sm:w-full max-md:w-3/4 max-lg:w-4/6 justify-center gap-2 text-foreground">
        <div className="flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
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
          <span>
            <Link className="text-blue-500" href="/hrml">
              I forget Password
            </Link>
          </span>
        </div>
        <SubmitButton
          formAction={signIn}
          pendingText="Signing In..."
          variant={"flat"}
        >
          Sign In
        </SubmitButton>
        <SubmitButton
          formAction={signUp}
          pendingText="Signing Up..."
          variant={"flat"}
        >
          تسجيل حساب جديد
        </SubmitButton>
        <div className={`flex justify-center items-center gap-3 *:w-full`}>
          <SubmitButton
            color="default"
            formAction={signInWithGithub}
            pendingText="Signing with Github...."
            variant="bordered"
          >
            <GithubSVG />
            <p>Github</p>
          </SubmitButton>
          <SubmitButton
            color="default"
            formAction={signInWithGoogle}
            pendingText="Signing with Google..."
            variant="bordered"
          >
            <GoogleSVG />
            <p>Google</p>
          </SubmitButton>
        </div>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  ) : (
    redirect(`/`)
  );
}
