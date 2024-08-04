"use client";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import {
  ChevronDownCircleIcon,
  ChevronUpCircleIcon,
  CircleMinus,
} from "lucide-react";
import React, { useState } from "react";

export default function Block() {
  const [blocks, setBlocks] = useState<{ type: string; content: any }[]>([]);

  const handleInsertTextBlock = (index: number) => {
    const newBlock = { type: "text", content: "" };

    setBlocks((prevBlocks) => [
      ...prevBlocks.slice(0, index),
      newBlock,
      ...prevBlocks.slice(index),
    ]);
  };

  const handleInsertImageBlock = (index: number) => {
    const newBlock = {
      type: "image",
      content: "https://via.placeholder.com/150",
    };

    setBlocks((prevBlocks) => [
      ...prevBlocks.slice(0, index),
      newBlock,
      ...prevBlocks.slice(index),
    ]);
  };

  const handleContentChange = (index: number, newContent: string) => {
    const newBlocks = [...blocks];

    if (newBlocks[index].type === "text") {
      newBlocks[index].content = newContent;
    }
    setBlocks(newBlocks);
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const files = event.target.files;

    if (files) {
      const newBlocks = [...blocks];
      const newBlocksToAdd = Array.from(files).map((file) => {
        const newURL = URL.createObjectURL(file);

        return {
          type: "image",
          content: newURL,
        };
      });

      setBlocks((prevBlocks) => [
        ...prevBlocks.slice(0, index + 1),
        ...newBlocksToAdd,
        ...prevBlocks.slice(index + 1),
      ]);
    }
  };

  const handleAddNewImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const files = event.target.files;

    if (files) {
      const newBlocksToAdd = Array.from(files).map((file) => {
        const newURL = URL.createObjectURL(file);

        return {
          type: "image",
          content: newURL,
        };
      });

      setBlocks((prevBlocks) => [
        ...prevBlocks.slice(0, index),
        ...newBlocksToAdd,
        ...prevBlocks.slice(index + 1),
      ]);
    }
  };

  const handleDeleteBlock = (index: number) => {
    const newBlocks = blocks.filter((_, i) => i !== index);

    setBlocks(newBlocks);
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    const newBlocks = [...blocks];
    const [removedBlock] = newBlocks.splice(index, 1);
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex <= newBlocks.length) {
      newBlocks.splice(newIndex, 0, removedBlock);
      setBlocks(newBlocks);
    }
  };

  return (
    <main className="w-full flex justify-center">
      <section className="w-full max-w-5xl">
        {blocks.map((block, index) => (
          <div key={index}>
            <div className="w-full flex justify-center items-center my-3">
              <Button
                style={{ marginRight: "10px" }}
                variant="bordered"
                onClick={() => handleInsertTextBlock(index)}
              >
                Text
              </Button>
              <Button
                style={{ marginRight: "10px" }}
                variant="bordered"
                onClick={() => handleInsertImageBlock(index)}
              >
                Image
              </Button>
            </div>
            <div className="w-full flex gap-5">
              <div className="flex flex-col">
                <button
                  className="p-0 m-0 sticky top-0"
                  onClick={() => handleDeleteBlock(index)}
                >
                  <CircleMinus
                    absoluteStrokeWidth
                    size={20}
                    strokeWidth={1.75}
                  />
                </button>
                <button
                  className="p-0 m-0 sticky top-5"
                  disabled={index === 0}
                  onClick={() => moveBlock(index, "up")}
                >
                  <ChevronUpCircleIcon
                    absoluteStrokeWidth
                    size={20}
                    strokeWidth={1.75}
                  />
                </button>
                <button
                  className="p-0 m-0 sticky top-10"
                  disabled={index === blocks.length - 1}
                  onClick={() => moveBlock(index, "down")}
                >
                  <ChevronDownCircleIcon
                    absoluteStrokeWidth
                    size={20}
                    strokeWidth={1.75}
                  />
                </button>
              </div>
              <div className="w-full">
                {block.type === "text" && (
                  <div>
                    <Textarea
                      className="z-10 h-full w-full text-6xl font-semibold leading-loose whitespace-normal bg-background"
                      dir="auto"
                      placeholder="Edit text"
                      style={{
                        fontSize: "28px",
                        lineHeight: "2rem",
                      }}
                      value={block.content}
                      onChange={(e) =>
                        handleContentChange(index, e.target.value)
                      }
                    />
                  </div>
                )}
                {block.type === "image" && (
                  <div>
                    <img
                      alt={`uploaded-${index}`}
                      className="object-contain"
                      src={block.content}
                    />
                    <Button
                      variant="bordered"
                      onClick={() =>
                        document
                          .getElementById(`file-input-new-${index}`)
                          ?.click()
                      }
                    >
                      Add Image /Change
                    </Button>
                    <input
                      multiple
                      accept="image/*"
                      id={`file-input-new-${index}`}
                      style={{ display: "none" }}
                      type="file"
                      onChange={(e) => handleAddNewImage(e, index)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div>
          <div className="w-full flex justify-center items-center my-3">
            <Button
              style={{ marginRight: "10px" }}
              variant="bordered"
              onClick={() => handleInsertTextBlock(blocks.length)}
            >
              Text
            </Button>
            <Button
              style={{ marginRight: "10px" }}
              variant="bordered"
              onClick={() => handleInsertImageBlock(blocks.length)}
            >
              Image
            </Button>
          </div>
        </div>
        {JSON.stringify(blocks, null, 2 | 4)}
      </section>
    </main>
  );
}
