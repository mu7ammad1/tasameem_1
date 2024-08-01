import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const {
  data: { user },
} = await supabase.auth.getUser();

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

export async function getUserData(username: any) {
  const supabase = createClient();

  try {
    let { data: user, error } = await supabase
      .from("profiles")
      .select("*") // يمكنك تحديد الأعمدة التي تريدها بدلاً من "*"
      .eq("username", username)
      .single(); // لأننا نتوقع نتيجة واحدة فقط

    if (error) throw error;

    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);

    return null; // أو يمكنك معالجة الخطأ بطريقة أخرى
  }
}
export async function getEmail() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.email;
}
export async function getUserID() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id;
}
