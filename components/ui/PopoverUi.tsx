import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { User } from "@nextui-org/user";

import { UserTwitterCard } from "./UserTwitterCard";

export default function PopoverUi({
  avatar,
  username,
  full_name,
  bio,
  followerId,
  followingId,
}: any) {
  return (
    <Popover showArrow placement="bottom">
      <PopoverTrigger>
        <User
          as="button"
          avatarProps={{
            src: avatar,
          }}
          className="transition-transform"
          description="Product Designer"
          name={full_name}
        />
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <UserTwitterCard
          avatar={avatar}
          bio={bio}
          followerId={followerId}
          followingId={followingId}
          full_name={full_name}
          username={username}
        />
      </PopoverContent>
    </Popover>
  );
}
