"use client";
import React from "react";
import { User } from "@nextui-org/user";
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { PictureInPicture2 } from "lucide-react";

import TipTap from "./tip";

export default function CardProf({ avatar, content }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <section className="w-full mt-5">
      <div className="bg-foreground-100 rounded-2xl p-3 w-full flex justify-between items-center">
        <User
          avatarProps={{
            src: avatar,
            alt: "NextUI hero Image with delay",
            className: "rounded-full object-cover",
            size: "md",
            name: "TM",
          }}
          name={``}
        />
        <div className="flex gap-3">
          <Button isIconOnly className={`rounded-full`} variant="ghost">
            TM
          </Button>
          <Button
            isIconOnly
            className={`rounded-full`}
            variant="ghost"
            onPress={onOpen}
          >
            <PictureInPicture2
              absoluteStrokeWidth
              size={20}
              strokeWidth={1.5}
            />
          </Button>
          <Modal isOpen={isOpen} size="5xl" onOpenChange={onOpenChange}>
            <ModalContent className="pb-5">
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Description
                  </ModalHeader>
                  <ModalBody>
                    <TipTap content={content} />
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </section>
  );
}
