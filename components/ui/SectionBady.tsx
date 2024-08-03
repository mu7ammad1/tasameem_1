import React from "react";
import { Image } from "@nextui-org/image";

export default function SectionBady({ boards }: any) {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-2">
      {boards.map(({ id, boards }: any) => (
        <div key={id}>{id}</div>
      ))}
      {boards.map(({ id, boards }: any) => (
        <Image
          key={id}
          alt="NextUI hero Image with delay"
          fallbackSrc="https://via.placeholder.com/300x200"
          src={`https://hsmahnunqgbyxyjzikko.supabase.co/storage/v1/object/public/avatars/avatar/${boards}`}
          width={896}
        />
      ))}
    </div>
  );
}
