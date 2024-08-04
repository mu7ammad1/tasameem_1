"use client";
import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";

export default function IsFollow({ followerId, followingId }: any) {
  const supabase = createClient();
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFollowStatus = async () => {
      setLoading(true);
      let { data: follow } = await supabase
        .from("follow")
        .select("*")
        .eq("following", followingId)
        .eq("follower", followerId)
        .single();

      setIsFollowing(follow !== null);
      setLoading(false);
    };

    checkFollowStatus();
  }, [supabase, followingId, followerId]);

  const handleFollowToggle = async () => {
    if (isFollowing) {
      // إلغاء المتابعة
      let { error } = await supabase
        .from("follow")
        .delete()
        .eq("following", followingId)
        .eq("follower", followerId);

      if (!error) {
        setIsFollowing(false);
      } else {
        console.error("Error unfollowing:", error);
      }
    } else {
      // متابعة
      let { error } = await supabase
        .from("follow")
        .insert([{ following: followingId, follower: followerId }]);

      if (!error) {
        setIsFollowing(true);
      } else {
        console.error("Error following:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (followerId === followingId) {
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
    <div>
      <Button
        className="leading-8 tracking-widest mt-2 w-40 font-medium"
        color={isFollowing ? "default" : "primary"} // استخدام اللون "danger" بدلاً من "error"
        variant={isFollowing ? "bordered" : "solid"}
        onClick={handleFollowToggle}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
}
