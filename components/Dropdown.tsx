"use client";
import * as React from "react";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import Link from "next/link";

import { createClient } from "@/utils/supabase/client";

export default function Dropdowns({ user, ss }: any) {
  const router = useRouter(); // Initialize the router

  const signOut = async () => {
    try {
      const supabase = createClient();

      await supabase.auth.signOut();
      router.refresh();
    } catch (error) {
      router.refresh();
    }
  };

  return user ? (
    <div className="flex items-center gap-4">
      <Dropdown backdrop="blur" placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform object-fill"
            src={`https://hsmahnunqgbyxyjzikko.supabase.co/storage/v1/object/public/avatars/avatar/${ss?.avatar}`}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user?.email}</p>
          </DropdownItem>
          <DropdownItem key="new" href="/new">
            New
          </DropdownItem>
          <DropdownItem key="profile" href={`/${ss?.username}`}>
            My Profile
          </DropdownItem>
          <DropdownItem key="settings" href="/dashboard/setting">
            My Settings
          </DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={signOut}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  ) : (
    <Link href="/login">
      <Button className="max-w-fit">تسجيل دخول</Button>
    </Link>
  );
}
