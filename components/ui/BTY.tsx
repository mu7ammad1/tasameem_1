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
  const [selectedKeys, setSelectedKeys]: any = React.useState(
    new Set(["Recommended"]),
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  return (
    <div className={`flex items-center justify-between w-full gap-3 mt-10`}>
      <div className="flex gap-5">
        <Dropdown>
          <DropdownTrigger>
            <Button className="capitalize" variant="bordered">
              {selectedValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Single selection example"
            selectedKeys={selectedKeys}
            selectionMode="single"
            variant="flat"
            onSelectionChange={setSelectedKeys}
          >
            <DropdownItem key="Recommended">Recommended</DropdownItem>
            <DropdownItem key="Curated">Curated</DropdownItem>
            <DropdownItem key="Most_Viewed">Most Viewed</DropdownItem>
            <DropdownItem key="Most_Recent">Most Recent</DropdownItem>
            <DropdownItem key="Most_Discussed">Most Discussed</DropdownItem>
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
