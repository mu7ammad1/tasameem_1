import { Link } from "@nextui-org/link";
import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="w-full flex items-center justify-center py-3 gap-2">
        <span className="text-default-600">Powered by</span>
        <Link
          isExternal
          className="flex items-center text-current"
          href="https://tasamim.net?utm_source=next-app-template"
          title="nextui.org homepage"
        >
          <p className="text-primary">Tasamim</p>
        </Link>
      </footer>
    </div>
  );
}
