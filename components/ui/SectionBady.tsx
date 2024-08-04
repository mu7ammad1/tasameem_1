import React from "react";
import { Image } from "@nextui-org/image";

export default function SectionBady({ boards }: any) {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-4 z-10">
      {boards?.map((item: any, index: any) => (
        <div key={index} className="w-full">
          {item.type === "text" && (
            <p
              className={`py-6 text-left text-2xl font-medium flex justify-end items-center bg-foreground-50 px-2 rounded-md`}
            >
              {item.content}
            </p>
          )}
          {item.type === "image" && (
            <div className="w-full flex justify-center items-center">
              <Image
                alt={`Image ${index}`}
                className="w-full h-full cursor-pointer"
                src={`https://hsmahnunqgbyxyjzikko.supabase.co/storage/v1/object/public/avatars/boards/${item.content}`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
