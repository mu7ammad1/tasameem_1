"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/use-disclosure";

export default function B() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalTitle, setModalTitle] = useState("saf");

  const handleOpenModal = (title: string) => {
    setModalTitle(title);
    onOpen();
  };

  return (
    <div className="flex justify-center items-center gap-3">
      <div className="flex justify-center items-center gap-3">
        <Button variant="light">
          <svg
            aria-hidden="true"
            className="lucide lucide-library"
            fill="none"
            focusable="false"
            height="20"
            role="presentation"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m16 6 4 14" />
            <path d="M12 6v14" />
            <path d="M8 8v12" />
            <path d="M4 4v16" />
          </svg>
          <span>Boards</span>
        </Button>
        <Button
          color="default"
          variant="flat"
          onPress={() => handleOpenModal("About")}
        >
          About
        </Button>
        <Button
          color="default"
          variant="flat"
          onPress={() => handleOpenModal("Following")}
        >
          Following
        </Button>
      </div>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        placement="auto"
        size="xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent key={modalTitle}>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalTitle}
              </ModalHeader>
              <ModalBody>
                {modalTitle === "About" && <p>About content here...</p>}
                {modalTitle === "Following" && <p>Following content here...</p>}
              </ModalBody>
              <ModalFooter>
                <p>sdgaoikhnoi non</p>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
