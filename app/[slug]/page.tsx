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
    .select("id,username,avatar,full_name,bio,work,verification")
    .eq(`username`, params.slug.toLowerCase())
    .limit(1)
    .single();


  let { data: board } = await supabase
    .from("boards")
    .select("background,title,id,username,profiles(avatar),loves(id)")
    .eq(`username`, params.slug.toLowerCase());


  return (
    <div>
      {username?.username ? (
        <Slug
          params={{
            slug: params.slug,
            full_name: username.full_name,
            verification: username.verification,
            bio: username.bio,
            work: username.work,
            boar: board,
            avatar: username.avatar,
            followerId: user?.id, // معرف المستخدم المتابع
            followingId: username.id, // معرف المستخدم المتبوع
          }}
        />
      ) : (
        `false`
      )}
    </div>
  );
}
