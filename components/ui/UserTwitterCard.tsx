"use client";
import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Info } from "lucide-react";

export const UserTwitterCard = ({ avatar, username, full_name, bio }: any) => {
  return (
    <Card className="max-w-[300px] border-none bg-transparent" shadow="none">
      <CardHeader className="justify-between gap-5">
        <div className="flex gap-3">
          <Avatar isBordered radius="full" size="md" src={avatar} />
          <div className="flex flex-col items-start justify-center">
            <Link
              className="text-small font-semibold leading-none text-default-600"
              href={`/${username}`}
            >
              {full_name}
            </Link>
            <h5 className="text-small tracking-tight text-default-500">
              @{username}
            </h5>
          </div>
        </div>
        <Button isIconOnly radius="full" size="md" variant="flat">
          <Info absoluteStrokeWidth size={20} strokeWidth={1.7} />
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-2 pb-3">
        <p className="text-small pl-px text-default-500">{bio}</p>
      </CardBody>
    </Card>
  );
};
