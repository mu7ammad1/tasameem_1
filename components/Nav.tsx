"use client";
import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import NextLink from "next/link";
import { Button } from "@nextui-org/button";
import { clsx } from "clsx";
import { Fugaz_One } from "next/font/google";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon } from "@/components/icons";

import Dropdowns from "./Dropdown";
const fugaz_One = Fugaz_One({
  weight: "400",
  subsets: ["latin"],
});

export function Navbar({ user, ss }: any) {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-lg",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      variant="bordered"
    />
  );

  return (
    <div>
      <NextUINavbar as={`nav`} maxWidth="xl" position="static">
        <NavbarContent className="basis-1/5 max-sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit max-sm:gap-0">
            <NextLink
              className="flex justify-start items-center gap-4 ml-2"
              href="/"
            >
              {/* <Logo /> */}
              <p className={clsx(`font-medium text-3xl`, fugaz_One.className)}>
                tasa<span className="text-blue-500">mim</span>
              </p>
            </NextLink>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            <ThemeSwitch />
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        </NavbarContent>
        <NavbarContent className="sm:hidden basis-1 pl-4" justify="center">
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>
        <NavbarMenu>
          {searchInput}
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  href={`${item.href}`}
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
        <Link href="/new">
          <Button variant="ghost">New Board</Button>
        </Link>
        <Dropdowns ss={ss} user={user} />
      </NextUINavbar>
    </div>
  );
}
