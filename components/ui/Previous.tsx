import React from "react";
import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Link } from "@nextui-org/link";

export default function Previous() {
  const list = [
    {
      title: "Orange",
      img: "https://images.pexels.com/photos/17692060/pexels-photo-17692060/free-photo-of-close-up-of-kitten.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "$5.50",
    },
    {
      title: "Orange",
      img: "https://images.pexels.com/photos/17692060/pexels-photo-17692060/free-photo-of-close-up-of-kitten.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "$5.50",
    },
    {
      title: "Lemon 2",
      img: "https://images.pexels.com/photos/25186561/pexels-photo-25186561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "$8.00",
    },
  ];

  return (
    <section className={`w-full`}>
      <h1 className="my-4 text-base font-medium">more by Tasamim</h1>
      <div className="gap-5 grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 w-full max-lg:grid-cols-3">
        {list.map((item, index) => (
          <Card
            key={index}
            isPressable
            className={`bg-white/0 light:bg-white/0`}
            shadow="none"
          >
            <Link
              className="flex flex-col flex-1 w-full"
              href={`/board/1234567`}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  alt={item.title}
                  className="w-full object-cover h-48 max-sm:h-64"
                  radius="sm"
                  shadow="none"
                  src={item.img}
                  width="100%"
                />
              </CardBody>
            </Link>
            <CardFooter className="text-small justify-between">
              <b>{item.title}</b>
              <Link href={`/Tasamim`}>
                <Avatar
                  className={`w-5 h-5`}
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
