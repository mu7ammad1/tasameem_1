"use client";
import { Input, Textarea } from "@nextui-org/input";
import {
  ChevronDownCircleIcon,
  ChevronUpCircleIcon,
  CircleMinus,
} from "lucide-react";
import React, { useCallback, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  DropdownSection,
  Image,
} from "@nextui-org/react";

import { createClient } from "@/utils/supabase/client";

export default function Block() {
  const [blocks, setBlocks] = useState<{ type: string; content: any }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");

  const [selectedKey, setSelectedKey]: any = useState(new Set(["Design"]));
  const [selectedKeys, setSelectedKeys]: any = React.useState(
    new Set(["Design"]),
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKey).join(", ").replaceAll("_", " "),
    [selectedKey],
  );
  const selectedValues = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

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
      content: "https://via.placeholder.com/1024",
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

  const handleSave = useCallback(async () => {
    // Filter out empty or placeholder image blocks
    const filteredBlocks = blocks.filter(
      (block) =>
        (block.type === "text" && block.content.trim() !== "") ||
        (block.type === "image" &&
          block.content !== "https://via.placeholder.com/1024"),
    );

    // Handle cases with different messages
    if (blocks.length === 0) {
      setMessage("لا توجد بلوكات لحفظها.");

      return;
    }

    if (filteredBlocks.length === 0) {
      const hasTextBlock = blocks.some(
        (block) => block.type === "text" && block.content.trim() === "",
      );
      const hasPlaceholderImage = blocks.some(
        (block) =>
          block.type === "image" &&
          block.content === "https://via.placeholder.com/1024",
      );

      if (hasTextBlock) {
        setMessage("يوجد بلوكات نصية فارغة.");
      } else if (hasPlaceholderImage) {
        setMessage("يوجد روابط صور غير متاحة.");
      } else {
        setMessage("لا توجد بلوكات صالحة للحفظ.");
      }

      return;
    }

    setIsLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const tagsArray = selectedValues.split(", ").map((tag) => tag.trim());
    // Determine the background image
    let backgroundImage = "original-d272f0bf5b00ca45764760a62b9bafb4"; // default background
    const imageBlock = filteredBlocks.find((block) => block.type === "image");

    if (imageBlock) {
      backgroundImage = imageBlock.content;
    }
    const { error } = await supabase.from("boards").insert([
      {
        title: title,
        boards: filteredBlocks,
        background: backgroundImage,
        user: user?.id,
        tags: tagsArray,
        categories: selectedValue,
      },
    ]);

    setIsLoading(false);
    if (error) {
      console.error("Error inserting blocks:", error);
      setMessage("خطأ في حفظ البلوكات. حاول مرة أخرى.");
    } else {
      console.log("Blocks inserted successfully");
      setBlocks([]); // Clear blocks after successful save
      setMessage("تم حفظ البلوكات بنجاح.");
    }
  }, [blocks]);

  const categories: any = [
    "Design",
    "Architecture",
    "Art Direction",
    "Branding",
    "Fashion",
    "Graphic Design",
    "Illustration",
    "Industrial Design",
    "Interaction Design",
    "Motion Graphics",
    "Photography",
    "UI/UX",
    "Web Design",
    "3D Art",
    "3D Modeling",
    "3D Motion",
    "Advertising",
    "Advertising Photography",
    "Animation",
    "App Design",
    "Apparel",
    "AR/VR",
    "Architecture Concept",
    "Architecture Photography",
    "Architecture Visualization",
    "Automotive Design",
    "Beauty Photography",
    "Calligraphy",
    "CGI",
    "Character Design",
    "Cinematography",
    "Collage",
    "Coloring",
    "Comic",
    "Concept Art",
    "Copywriting",
    "Costume Design",
    "Crafts",
    "Creative Direction",
    "Culinary Arts",
    "Digital Art",
    "Digital Painting",
    "Directing",
    "Drawing",
    "Editing",
    "Editorial Design",
    "Education",
    "Environmental Graphics",
    "Exhibition Design",
    "Fashion Design",
    "Fashion Illustration",
    "Fashion Photography",
    "Fashion Retouching",
    "Fashion Styling",
    "Film",
    "Fine Arts",
    "Floral Design",
    "Game Design",
    "Graphic Novel",
    "Hand Lettering",
    "Infographics",
    "Interior Design",
    "Jewelry Design",
    "Landscape Architecture",
    "Letterpress",
    "Marketing",
    "Motion Design",
    "Product Design",
    "Sculpture",
    "Social Media Design",
    "Street Art",
    "Tattoo Art",
    "Textile Design",
    "Typography",
    "Video Production",
    "Web Development",
    "Web Illustration",
  ];

  return (
    <main className="w-full flex flex-col justify-center">
      <section className="w-full flex justify-center">
        <Input
          isClearable
          isRequired
          className="w-2/3 font-black *:*:*:*:text-4xl *:*:*:*:font-medium"
          color="default"
          name="title"
          placeholder="Give me a title"
          type="text"
          value={title}
          variant={"underlined"}
          onChange={(e) => setTitle(e.target.value)}
        />
      </section>
      <section className="w-full flex justify-center">
        <section className="w-full max-w-5xl">
          {blocks.map((block, index) => (
            <div key={index}>
              <div className="w-full flex justify-center items-center my-3">
                <Dropdown backdrop="blur" placement="top">
                  <DropdownTrigger>
                    <Button variant="flat">فتح القائمة</Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Dynamic Actions">
                    <DropdownItem key="copy">
                      <Button
                        style={{ marginRight: "10px" }}
                        variant="bordered"
                        onClick={() => handleInsertImageBlock(index)}
                      >
                        صور
                      </Button>
                    </DropdownItem>
                    <DropdownItem key="new">
                      <Button
                        style={{ marginRight: "10px" }}
                        variant="bordered"
                        onClick={() => handleInsertTextBlock(index)}
                      >
                        نصوص
                      </Button>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="w-full flex gap-5">
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
                    </div>
                  )}
                  {block.type === "image" && (
                    <div className="relative flex justify-center w-full">
                      <Image alt={`uploaded-${index}`} src={block.content} />
                      <div className="py-4 top-0 left-4 z-50 absolute h-full">
                        <div className="top-4 left-0 z-50 sticky flex justify-between">
                          <Button
                            isIconOnly
                            className="top-4 left-0 z-50 sticky rounded-full"
                            color="default"
                            variant="solid"
                            onClick={() =>
                              document
                                .getElementById(`file-input-new-${index}`)
                                ?.click()
                            }
                          >
                            Add
                          </Button>
                          <input
                            multiple
                            accept="image/*"
                            id={`file-input-new-${index}`}
                            style={{ display: "none" }}
                            type="file"
                            onChange={(e) => handleAddNewImage(e, index)}
                          />
                          <Button
                            isIconOnly
                            className="top-4 left-0 z-50 sticky rounded-full"
                            color="default"
                            variant="solid"
                            onClick={() => handleDeleteBlock(index)}
                          >
                            <CircleMinus
                              absoluteStrokeWidth
                              size={20}
                              strokeWidth={1.75}
                            />
                          </Button>
                          <Button
                            isIconOnly
                            className="top-4 left-0 z-50 sticky rounded-full"
                            color="default"
                            disabled={index === 0}
                            variant="solid"
                            onClick={() => moveBlock(index, "up")}
                          >
                            <ChevronUpCircleIcon
                              absoluteStrokeWidth
                              size={20}
                              strokeWidth={1.75}
                            />
                          </Button>
                          <Button
                            isIconOnly
                            className="top-4 left-0 z-50 sticky rounded-full"
                            color="default"
                            disabled={index === blocks.length - 1}
                            variant="solid"
                            onClick={() => moveBlock(index, "down")}
                          >
                            <ChevronDownCircleIcon
                              absoluteStrokeWidth
                              size={20}
                              strokeWidth={1.75}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div>
            <div className="w-full flex justify-center items-center my-3">
              <Dropdown backdrop="opaque">
                <DropdownTrigger>
                  <Button variant="flat">فتح القائمة</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions">
                  <DropdownItem key="new">
                    <Button
                      style={{ marginRight: "10px" }}
                      variant="bordered"
                      onClick={() => handleInsertImageBlock(blocks.length)}
                    >
                      صورة او مجموعة صور
                    </Button>
                  </DropdownItem>
                  <DropdownItem key="copy">
                    <Button
                      style={{ marginRight: "10px" }}
                      variant="bordered"
                      onClick={() => handleInsertTextBlock(blocks.length)}
                    >
                      نصوص
                    </Button>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div>
            <Button
              className="btn-save"
              disabled={isLoading}
              variant="flat"
              onClick={handleSave}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <section className="w-full max-w-3xl">
              {message && <div className="alert alert-warning">{message}</div>}
              {/* باقي الكود هنا */}
            </section>
            <Dropdown>
              <DropdownTrigger>
                <Button className="capitalize" variant="bordered">
                  {selectedValue}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Single selection example"
                itemClasses={{
                  base: [
                    "rounded-md",
                    "text-default-500",
                    "transition-opacity",
                    "data-[hover=true]:text-foreground",
                    "data-[hover=true]:bg-default-100",
                    "dark:data-[hover=true]:bg-default-50",
                    "data-[selectable=true]:focus:bg-default-50",
                    "data-[pressed=true]:opacity-70",
                    "data-[focus-visible=true]:ring-default-500",
                  ],
                }}
                selectedKeys={selectedKey}
                selectionMode="single"
                variant="flat"
                onSelectionChange={setSelectedKey}
              >
                <DropdownSection
                  aria-label="Example with disabled actions"
                  className="w-full h-60 overflow-y-auto overflow-x-hidden px-2"
                >
                  <DropdownItem
                    key="profile"
                    isReadOnly
                    className="h-14 gap-0 opacity-100 w-full p-0 m-0"
                  >
                    <Input placeholder="Search Puplar..." type="search" />{" "}
                  </DropdownItem>
                  {categories.map((category: string) => (
                    <DropdownItem key={category}>{category}</DropdownItem>
                  ))}
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
            {JSON.stringify(selectedValues)}
            <Dropdown>
              <DropdownTrigger>
                <Button className="capitalize" variant="bordered">
                  {selectedValues}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Multiple selection example"
                className="w-full h-60"
                closeOnSelect={false}
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                variant="flat"
                onSelectionChange={setSelectedKeys}
              >
                <DropdownSection
                  aria-label="Example with disabled actions"
                  className="w-full h-60 overflow-y-auto overflow-x-hidden px-2"
                >
                  <DropdownItem
                    key="profile"
                    isReadOnly
                    className="h-14 gap-0 opacity-100 w-full p-0 m-0"
                  >
                    <Input placeholder="Search Puplar..." type="search" />
                  </DropdownItem>
                  {categories.map((category: string) => (
                    <DropdownItem key={category}>{category}</DropdownItem>
                  ))}
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </div>
        </section>
      </section>
    </main>
  );
}
