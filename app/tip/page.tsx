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
import { Image } from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";



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

export default function TipTap() {

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
      Image,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What’s the title?";
          }

          return "Can you add some further context?";
        },
      }),
    ],
    content: `
      <h1>Hey, try to select some text here.</h1>
      <p>There will popup a menu for selecting some inline styles. Remember: you have full control about content and styling of this menu.</p>
    `,
  });

  if (!editor) {
    return null;
  }


  return (
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
                      editor.chain().focus().setFontFamily(`Courier New`).run()
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
      <EditorContent editor={editor} />
    </div>
  );
}
