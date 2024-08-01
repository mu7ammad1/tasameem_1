import React from "react";

import { Navbar } from "./Nav";

export default function NavbarCom({ sss }: any) {
  return (
    <div>
      <Navbar user={sss} />
    </div>
  );
}
