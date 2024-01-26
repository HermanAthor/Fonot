"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";

const Tiptap = ({ receipe, onChange }) => {
  console.log(receipe);
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: receipe,
    editorProps: {
      attributes: {
        class:
          "rounded-md border min-h-[150px] border-input bg-white text-black p-5 text-xl",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  });
  return (
    <div className="flex flex-col justify-stretch min-h-[150px] ">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
