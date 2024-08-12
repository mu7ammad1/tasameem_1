"use client";
import { Input } from "@nextui-org/input";
import {
  ChevronDownCircleIcon,
  ChevronUpCircleIcon,
  Loader,
} from "lucide-react";
import React, { useCallback, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Image,
} from "@nextui-org/react";
import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
} from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Bold } from "@tiptap/extension-bold";
import { Italic } from "@tiptap/extension-italic";
import { Heading } from "@tiptap/extension-heading";
import { Link } from "@tiptap/extension-link";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { createClient } from "@/utils/supabase/client";

type BlockType = "image";

interface Block {
  type: BlockType;
  content: any;
}

export default function Block() {
  const [blocks, setBlocks] = useState<{ type: string; content: any }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  const uploadImageToSupabase = async (file: File): Promise<string | null> => {
    const supabase = createClient();
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("avatars/boards")
      .upload(fileName, file);

    if (error) {
      console.error("Error uploading image:", error);

      return null;
    }

    const { data: publicURL } = supabase.storage
      .from("avatars/boards")
      .getPublicUrl(fileName);

    return publicURL.publicUrl;
  };

  const handleAddNewImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const files = event.target.files;

    if (files) {
      const newBlocksToAdd: any = [];

      for (const file of files) {
        newBlocksToAdd.push({
          type: "image",
          content: URL.createObjectURL(file), // استخدم URL.createObjectURL للعرض المحلي
          localFile: file, // أضف خاصية للملف المحلي
        });
      }

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
    // تأكد من أن هناك كتلة واحدة على الأقل
    if (blocks.length < 2) return;

    // تحديد الموضع الجديد للكتلة بناءً على الاتجاه
    const newIndex = direction === "up" ? index - 1 : index + 1;

    // التحقق من أن الموضع الجديد لا يتجاوز حدود المصفوفة
    if (newIndex < 0 || newIndex >= blocks.length) return;

    // نسخ المصفوفة وتبديل مواضع الكتل
    const newBlocks = [...blocks];

    [newBlocks[index], newBlocks[newIndex]] = [
      newBlocks[newIndex],
      newBlocks[index],
    ];

    // تحديث حالة الكتل
    setBlocks(newBlocks);
  };

  const handleSave = useCallback(async () => {
    setIsLoading(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const tagsArray = selectedValues.split(", ").map((tag) => tag.trim());

    // رفع الصور وتحديث الكتل بالروابط
    const blocksWithUrls = await Promise.all(
      blocks.map(async (block: any) => {
        if (block.type === "image" && block.localFile) {
          const publicURL = await uploadImageToSupabase(block.localFile);

          if (publicURL) {
            return { ...block, content: publicURL };
          } else {
            return null; // في حالة فشل رفع الصورة
          }
        }

        return block;
      }),
    );

    // إزالة أي كتل تحتوي على صور لم يتم رفعها بنجاح
    const validBlocks = blocksWithUrls.filter(Boolean);

    // التحقق من أن هناك كتل صالحة
    if (validBlocks.length === 0) {
      setIsLoading(false);
      setMessage("لا توجد بلوكات صالحة للحفظ.");

      return;
    }

    const backgroundImage =
      validBlocks.find((block) => block.type === "image")?.content ||
      "default-image-url";

    const { error } = await supabase.from("boards").insert([
      {
        title: title,
        boards: validBlocks,
        background: backgroundImage,
        user: user?.id,
        tags: tagsArray,
        categories: selectedValue,
        datails: editor?.getJSON(),
      },
    ]);

    setIsLoading(false);
    if (
      error ||
      validBlocks.find((block) => block.type === "image")?.content ===
      `https://via.placeholder.com/1024`
    ) {
      console.error("Error inserting blocks:", error);
      setMessage("خطأ في حفظ البلوكات. حاول مرة أخرى.");
    } else {
      console.log("Blocks inserted successfully");
      setBlocks([]); // Clear blocks after successful save
      setMessage("تم حفظ البلوكات بنجاح.");
    }
  }, [blocks, selectedKey, selectedKeys, title]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Heading,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What’s the title?";
          }

          return "Can you add some further context?";
        },
      }),
    ],
    content: ``,
  });

  if (!editor) {
    return null;
  }

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
    <main className="w-full flex flex-col justify-center h-full">
      <section className="w-full flex justify-center">
        <Input
          isRequired
          required
          className="w-full max-w-4xl max-md:w-full font-black *:*:*:*:text-3xl *:*:*:*:font-medium *:*:*:*:placeholder:text-right *:*:*:*:placeholder:mb-2"
          color="default"
          dir="auto"
          name="title"
          placeholder="اعطي للجمال اسم"
          type="text"
          value={title}
          variant={"underlined"}
          onChange={(e) => setTitle(e.target.value)}
        />
      </section>
      <section className="w-full flex justify-center">
        <section className="w-full max-w-4xl">
          <div className="w-full min-h-80">
            {blocks.map((block, index) => (
              <div key={index}>
                <div className="w-full flex justify-center items-center my-3">
                  <Button
                    className="w-full"
                    variant="bordered"
                    onClick={() => handleInsertImageBlock(index)}
                  >
                    صور
                  </Button>
                </div>
                <div>
                  <div className="flex gap-3">
                    <Button
                      isIconOnly
                      className="p-0 m-0 sticky top-5"
                      disabled={index === 0}
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
                      className="p-0 m-0 sticky top-10"
                      disabled={index === blocks.length - 1}
                      onClick={() => moveBlock(index, "down")}
                    >
                      <ChevronDownCircleIcon
                        absoluteStrokeWidth
                        size={20}
                        strokeWidth={1.75}
                      />
                    </Button>
                  </div>
                  <div>
                    <div className="w-full flex gap-5">
                      <div className="w-full">
                        {block.type === "image" && (
                          <div className="h-full w-full">
                            <div className="py-4 w-full h-full">
                              <div className=" flex justify-between">
                                <Button
                                  isIconOnly
                                  className="w-full h-full"
                                  color="default"
                                  variant="bordered"
                                  onClick={() =>
                                    document
                                      .getElementById(`file-input-new-${index}`)
                                      ?.click()
                                  }
                                >
                                  <Image
                                    alt={`boards/${index}`}
                                    className="min-w-32 min-h-32"
                                    src={block.content}
                                  />
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
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div>
              <div className="w-full flex justify-center items-center my-3">
                <Button
                  className="w-full"
                  variant="bordered"
                  onClick={() => handleInsertImageBlock(blocks.length)}
                >
                  صورة
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-5">
            <Button disabled={isLoading} size="md" variant="flat" onClick={handleSave}>
              {isLoading ? (
                <p className="flex gap-3">
                  <span>
                    <Loader className="animate-spin" />
                  </span>
                  saving...
                </p>
              ) : (
                "Save"
              )}
            </Button>
            <section className="w-full max-w-3xl">
              {message && <div className="alert alert-warning">{message}</div>}
            </section>

            <Button onPress={onOpen}>اضف التفاصيل</Button>

            <Dropdown>
              <DropdownTrigger>
                <Button className="capitalize px-3" variant="bordered">
                  {selectedValues}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
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
                  {categories.map((category: string) => (
                    <DropdownItem key={category}>{category}</DropdownItem>
                  ))}
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <Button className="capitalize" variant="solid">
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
                variant="solid"
                onSelectionChange={setSelectedKey}
              >
                <DropdownSection
                  aria-label="Example with disabled actions"
                  className="w-full h-60 overflow-y-auto overflow-x-hidden px-2"
                >
                  {categories.map((category: string) => (
                    <DropdownItem key={category}>{category}</DropdownItem>
                  ))}
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </div>
        </section>
      </section>
      <section>
        <>
          <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent className="h-96">
              {(onClose) => (
                <>
                  <ModalBody>
                    <div style={{ padding: "20px", border: "1px solid #ddd" }}>
                      {editor && (
                        <BubbleMenu
                          className="bubble-menu"
                          editor={editor}
                          tippyOptions={{ duration: 100 }}
                        >
                          <div className="bubble-menu bg-background">
                            <Dropdown backdrop="opaque">
                              <DropdownTrigger>
                                <Button variant="bordered">Font</Button>
                              </DropdownTrigger>
                              <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="arial">
                                  <Button
                                    onClick={() =>
                                      editor.chain().focus().setFontFamily(`Arial`).run()
                                    }
                                  >
                                    Arial
                                  </Button>
                                </DropdownItem>
                                <DropdownItem key="georgia">
                                  <Button
                                    onClick={() =>
                                      editor.chain().focus().setFontFamily(`Georgia`).run()
                                    }
                                  >
                                    Georgia
                                  </Button>
                                </DropdownItem>
                                <DropdownItem key="times-new-roman">
                                  <Button
                                    onClick={() =>
                                      editor
                                        .chain()
                                        .focus()
                                        .setFontFamily(`Times New Roman`)
                                        .run()
                                    }
                                  >
                                    Times New Roman
                                  </Button>
                                </DropdownItem>
                                <DropdownItem key="courier-new">
                                  <Button
                                    onClick={() =>
                                      editor
                                        .chain()
                                        .focus()
                                        .setFontFamily(`Courier New`)
                                        .run()
                                    }
                                  >
                                    Courier New
                                  </Button>
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>

                            <Button
                              className={editor.isActive("bold") ? "is-active" : ""}
                              onClick={() => editor.chain().focus().toggleBold().run()}
                            >
                              Bold
                            </Button>
                            <Button
                              className={editor.isActive("italic") ? "is-active" : ""}
                              onClick={() => editor.chain().focus().toggleItalic().run()}
                            >
                              Italic
                            </Button>
                            <Button
                              className={editor.isActive("link") ? "is-active" : ""}
                              onClick={() => {
                                const url = prompt("Enter the URL");

                                if (url) {
                                  editor.chain().focus().setLink({ href: url }).run();
                                }
                              }}
                            >
                              Add Link
                            </Button>
                          </div>
                        </BubbleMenu>
                      )}
                      {editor && (
                        <FloatingMenu
                          className="floating-menu"
                          editor={editor}
                          tippyOptions={{ duration: 100 }}
                        >
                          <Button
                            className={editor.isActive("heading") ? "is-active" : ""}
                            onClick={() =>
                              editor.chain().focus().toggleHeading({ level: 1 }).run()
                            }
                          >
                            Heading
                          </Button>
                          <Button
                            className={editor.isActive("bold") ? "is-active" : ""}
                            onClick={() => editor.chain().focus().toggleBold().run()}
                          >
                            Bold
                          </Button>
                          <Button
                            className={editor.isActive("italic") ? "is-active" : ""}
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                          >
                            Italic
                          </Button>
                        </FloatingMenu>
                      )}

                      <CustomMenuBar editor={editor} />
                      <EditorContent editor={editor} className="AAAA" />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      </section>
    </main>
  );
}

const CustomMenuBar = ({ editor }: any) => {
  const setLink = () => {
    const url = prompt("Enter the URL");

    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const editLink = () => {
    const currentLink = editor.getAttributes("link").href;
    const newUrl = prompt("Edit the URL", currentLink);

    if (newUrl !== null) {
      editor.chain().focus().setLink({ href: newUrl }).run();
    }
  };

  const unsetLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  // Check if there's an active link
  const hasLink = editor.isActive("link");

  return (
    <div style={{ marginBottom: "10px" }}>
      <Button
        className={editor.isActive("heading") ? "is-active" : ""}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        Heading
      </Button>
      <Button
        className={editor.isActive("link") ? "is-active" : ""}
        onClick={setLink}
      >
        Add Link
      </Button>
      <Button
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        Left
      </Button>
      <Button
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        Center
      </Button>
      <Button
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        Right
      </Button>
      {hasLink && (
        <Button
          className={editor.isActive("link") ? "is-active" : ""}
          onClick={editLink}
        >
          Edit Link
        </Button>
      )}
      {hasLink && <Button onClick={unsetLink}>Remove Link</Button>}
    </div>
  );
};
