import React from "react";

import { createClient } from "@/utils/supabase/server";

import Slug from "./slug";

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: username } = await supabase
    .from("profiles")
    .select("id,username,avatar_url,full_name,bio,categories,verification")
    .eq(`username`, params.slug.toLowerCase())
    .limit(1)
    .single();


  let { data: board } = await supabase
    .from("boards")
    .select("background,title,id,profiles (avatar_url,username),loves (id)")
    .eq("draft", false)
    .eq(`user`, username?.id);


  return (
    <div>
      {username?.username ? (
        <Slug
          params={{
            slug: params.slug,
            full_name: username.full_name,
            verification: username.verification,
            bio: username.bio,
            work: username.categories,
            boar: board,
            avatar: username.avatar_url,
            followerId: user?.id,
            followingId: username.id,
            username: username.username
          }}
        />
      ) : (
        `0000`
      )}
    </div>
  );
}
