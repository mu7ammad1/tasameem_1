import React from "react";
import { Link } from "@nextui-org/link";
import { User } from "@nextui-org/user";

export default function CardProf() {
  return (
    <section className="w-full my-10">
      <div className="bg-foreground-100 p-5 w-full h-40 rounded-md mt-16 relative">
        <User
          avatarProps={{
            src: "https://avatars.githubusercontent.com/u/30373425?v=4",
            alt: "NextUI hero Image with delay",
            className: "rounded-full w-32 h-32 object-cover",
          }}
          className="flex flex-col text-center gap-3 *:flex *:justify-center *:items-center relative -top-20"
          description={
            <p className="mt-2">Looking to start an interesting project 👋</p>
          }
          name={
            <Link
              className="text-2xl font-medium"
              color="foreground"
              href="/tasameem"
            >
              tasameem
            </Link>
          }
        />
      </div>
    </section>
  );
}