import React from "react";

import { createClient } from "@/utils/supabase/server";

import Slug from "./slug";

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  let { data: username } = await supabase
    .from("profiles")
    .select("username,avatar")
    .eq(`username`, params.slug.toLowerCase())
    .limit(1)
    .single();

  let { data: board } = await supabase
    .from("boards")
    .select("background,title,id")
    .eq(`username`, params.slug.toLowerCase());

  return (
    <div>
      {username?.username ? (
        <Slug
          params={{
            slug: params.slug,
            full_name: `Tasamim Official`,
            verification: true,
            bio: `Looking to start an interesting project 👋`,
            work: `3D Artist / Generalist`,
            boar: board,
            avatar: username.avatar,
          }}
        />
      ) : (
        `false`
      )}
    </div>
  );
}
