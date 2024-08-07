import { redirect } from "next/navigation";
import { Input, Textarea } from "@nextui-org/input";

import { createClient } from "@/utils/supabase/server";

import { SubmitButton } from "../auth/login/submit-button";

import { Profile_bio, Profile_full_name, Profile_username } from "./user";

export default async function Continue({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const UpdateProfile = async (formData: FormData) => {
    "use server";
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const username = formData.get("username") as string;
    const full_name = formData.get("full_name") as string;
    const bio = formData.get("bio") as string;
    const verification = formData.get("verification") as string;

    const { error } = await supabase.from(`profiles`).upsert({
      id: user?.id,
      username: username,
      full_name: full_name,
      bio: bio,
      verification: verification
    });

    if (error) {
      return redirect("/continue?message=Could");
    }

    return redirect("/");
  };

  return (
    <main className="w-full">
      <div className="flex flex-row-reverse w-full px-8 justify-center gap-2 items-start h-screen">
        <form className="flex flex-col w-2/5 max-sm:w-full max-md:w-3/4 max-lg:w-4/6 justify-center gap-2 text-foreground">
          <div className="flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              isClearable
              color="default"
              defaultValue={`${await Profile_username()}`}
              label="username"
              name="username"
              placeholder="Enter your username"
              size="lg"
              type="text"
              variant={"bordered"}
            />
            <Input
              isClearable
              color="default"
              defaultValue={`${await Profile_full_name()}`}
              label="full name"
              name="full_name"
              placeholder="Enter your full name"
              type="text"
              variant={"bordered"}
            />
            <Textarea
              isMultiline
              color="default"
              defaultValue={`${await Profile_bio()}`}
              label="bio"
              name="bio"
              placeholder="Enter your bio"
              type="text"
              variant={"bordered"}
            />
          </div>
          <div className={`flex justify-center items-center gap-3 *:w-full`}>
            <SubmitButton
              color="default"
              formAction={UpdateProfile}
              pendingText="Update Profile now..."
              variant="bordered"
            >
              <p>Update Profile</p>
            </SubmitButton>
          </div>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
