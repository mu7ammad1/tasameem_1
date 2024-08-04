"use client";
import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";
import { Chip } from "@nextui-org/react";

import { createClient } from "@/utils/supabase/client";

export default function Isloved() {
  const supabase = createClient();
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [lovesCount, setLovesCount] = useState<number>(0);

  const followingId = `981dd070-e4f6-49f8-a0e1-a47675f07002`;
  const isboard: any = `14`;

  useEffect(() => {
    const checkFollowStatus = async () => {
      setLoading(true);
      let { data: love } = await supabase
        .from("loves")
        .select("*")
        .eq("love", followingId)
        .eq("board", isboard)
        .single();

      setIsFollowing(love !== null);
      setLoading(false);
    };

    const fetchLovesCount = async () => {
      let { count } = await supabase
        .from("loves")
        .select("*", { count: "exact", head: true })
        .eq("board", isboard);

      setLovesCount(count || 0);
    };

    checkFollowStatus();
    fetchLovesCount();
  }, [supabase, followingId, isboard]);

  const handleFollowToggle = async () => {
    if (isFollowing) {
      // إلغاء المتابعة
      let { error } = await supabase
        .from("loves")
        .delete()
        .eq("love", followingId)
        .eq("board", isboard);

      if (!error) {
        setIsFollowing(false);
        setLovesCount((prevCount) => prevCount - 1);
      } else {
        console.error("Error unfollowing:", error);
      }
    } else {
      // متابعة
      let { error } = await supabase
        .from("loves")
        .insert([{ love: followingId, board: isboard }]);

      if (!error) {
        setIsFollowing(true);
        setLovesCount((prevCount) => prevCount + 1);
      } else {
        console.error("Error following:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isboard === followingId) {
    return (
      <Button
        className="leading-8 tracking-widest mt-2 px-2 w-40 font-medium"
        color={"default"} // استخدام اللون "danger" بدلاً من "error"
        variant={"flat"}
      >
        لا يمكن متابعة نفسك
      </Button>
    );
  }

  return (
    <Button
      itemScope
      aria-label="Like"
      className={
        isFollowing ? "bg-transparent text-foreground border-default-200" : ""
      }
      color={isFollowing ? "default" : "primary"} // استخدام اللون "danger" بدلاً من "error"
      radius="full"
      size="sm"
      variant={isFollowing ? "bordered" : "solid"}
      onClick={handleFollowToggle}
    >
      <Chip radius="md" variant="light">
        {lovesCount}
      </Chip>
      <svg
        className="size-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.3}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {isFollowing ? "U n l o v e" : "F o l l o w"}
    </Button>
  );
}
