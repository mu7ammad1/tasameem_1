import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { createClient } from "@/utils/supabase/server";

import { SubmitButton } from "./login/submit-button";
import GithubSVG from "./GithubSVG";
import GoogleSVG from "./GoogleSVG";
import { Divider } from "@nextui-org/react";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
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
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
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
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <div className="flex flex-col w-full px-8 justify-center gap-2 items-start">
      <div className="w-full justify-center flex">
        <form className="flex flex-col w-2/5 max-sm:w-full max-md:w-3/4 max-lg:w-4/6 justify-center gap-2 text-foreground">
          <div className="flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <div
              className={`flex justify-center items-center gap-3 *:w-full max-sm:flex-col`}
            >
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
          </div>
        </form>
      </div>
      <Divider className="my-4 max-sm:hidden" />
      {children}
    </div>
  );
}
