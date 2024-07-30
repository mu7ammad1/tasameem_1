import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { user } from "@/action/read";

import { SubmitButton } from "./submit-button";

export default function Login({
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
  const signInWithGithub = async (formData: FormData) => {
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
  const signInWithGoogle = async (formData: FormData) => {
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

  return !user ? (
    <div className="flex flex-row-reverse w-full px-8 justify-center gap-2 items-start mt-16 h-screen">
      <form className="flex flex-col w-2/5 justify-center gap-2 text-foreground">
        <label className="text-md text-right" htmlFor="email">
          بريد اكتروني
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
        />
        <label className="text-md text-right" htmlFor="password">
          كلمة السر
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="password"
          placeholder="••••••••"
          type="password"
        />
        <SubmitButton
          className="bg-green-500 rounded-md px-4 py-2 text-foreground mb-2"
          formAction={signIn}
          pendingText="Signing In..."
        >
          Sign In
        </SubmitButton>
        <SubmitButton
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          formAction={signUp}
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>
        <div className={`flex justify-center items-center gap-3 *:w-full`}>
          <SubmitButton
            className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 flex justify-center items-center gap-3"
            formAction={signInWithGithub}
            pendingText="Signing with Github...."
          >
            <p>Github</p>
          </SubmitButton>
          <SubmitButton
            className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 flex justify-center items-center gap-3"
            formAction={signInWithGoogle}
            pendingText="Signing with Google..."
          >
            <p>Google</p>
          </SubmitButton>
        </div>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
      <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground" />
    </div>
  ) : (
    redirect(`/`)
  );
}