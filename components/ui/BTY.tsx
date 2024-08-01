"use client";

import { Button } from "@nextui-org/button";
import { usePathname } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import React from "react";

export default function BTY() {
  const pathname = usePathname();

  return (
    <div className={`flex items-center justify-between w-full gap-3 mt-10`}>
      <div className="flex gap-3">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">Open Menu</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="flex gap-3">
        <Button variant={pathname != `/following` ? `bordered` : `ghost`}>
          المتابعات
        </Button>
        <Button variant={pathname != `/` ? `bordered` : `flat`}>لك</Button>
      </div>
    </div>
  );
}
