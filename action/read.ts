// import { createClient } from "@/utils/supabase/server";

// const supabase: any = createClient();

// const {
//   data: { user },
// } = await supabase.auth.getUser();

// let { data: full_name } = await supabase
//   .from("profiles")
//   .select("full_name")
//   .eq(`id`, user?.id)
//   .limit(1)
//   .single();

// let { data: username } = await supabase
//   .from("profiles")
//   .select("username")
//   .eq(`id`, user?.id)
//   .limit(1)
//   .single();

// let { data: avatar } = await supabase
//   .from("profiles")
//   .select("avatar")
//   .eq(`id`, user?.id)
//   .limit(1)
//   .single();

// let { data: bio } = await supabase
//   .from("profiles")
//   .select("bio")
//   .eq(`id`, user?.id)
//   .limit(1)
//   .single();

// const access = avatar && full_name && username;

// export { user, full_name, username, avatar, bio, access };
