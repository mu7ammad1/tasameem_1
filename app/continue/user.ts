import { createClient } from "@/utils/supabase/server";

export async function Profile_username() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq(`id`, user?.id)
    .limit(1)
    .single();

  return profile?.username;
}
export async function Profile_full_name() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq(`id`, user?.id)
    .limit(1)
    .single();

  return profile?.full_name;
}
export async function Profile_bio() {
    const supabase = createClient();
  
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    let { data: profile } = await supabase
      .from("profiles")
      .select("bio")
      .eq(`id`, user?.id)
      .limit(1)
      .single();
  
    return profile?.bio;
  }
  