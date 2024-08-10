"use client";

import React from "react";
import { useQuill } from "react-quilljs";
// or const { useQuill } = require('react-quilljs');

import "quill/dist/quill.snow.css"; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

export default function ContentBuilder() {
  const theme = "snow";

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["link"],

    [{ header: 1 }, { header: 2 }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  const placeholder = "Compose an epic...";

  const formats = [
    "bold",
    "font",
    "italic",
    "link",
    "size",
    "strike",
    "underline",
    "header",
    "align",
  ];

  const { quillRef } = useQuill({ theme, formats, modules, placeholder });

  return (
    <div className="w-96 h-96 border border-red-500" style={{ width: 700, height: 300 }}>
      <div ref={quillRef} dir="auto" />

      {/* <div id="editor" /> */}
    </div>
  );
}
