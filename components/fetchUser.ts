// utils/fetchUser.js
import { createClient } from "@/utils/supabase/client";

export async function fetchUser() {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);

    return null;
  }
}
