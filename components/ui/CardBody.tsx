import React from "react";
import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Link } from "@nextui-org/link";

export default function CardBody_Page() {
  const list = [
    {
      title: "Orange",
      img: "https://images.pexels.com/photos/17692060/pexels-photo-17692060/free-photo-of-close-up-of-kitten.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "https://images.pexels.com/photos/4400679/pexels-photo-4400679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "https://images.pexels.com/photos/27200209/pexels-photo-27200209/free-photo-of-a-street-with-a-tree-in-bloom-and-people-walking.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "https://images.pexels.com/photos/26796134/pexels-photo-26796134/free-photo-of-desert-rainbow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "https://images.pexels.com/photos/15898047/pexels-photo-15898047/free-photo-of-surfer-running-towards-ocean.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "https://images.pexels.com/photos/25186561/pexels-photo-25186561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "$8.00",
    },
    {
      title: "Orange",
      img: "https://images.pexels.com/photos/17692060/pexels-photo-17692060/free-photo-of-close-up-of-kitten.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "https://images.pexels.com/photos/4400679/pexels-photo-4400679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "https://images.pexels.com/photos/27200209/pexels-photo-27200209/free-photo-of-a-street-with-a-tree-in-bloom-and-people-walking.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "https://images.pexels.com/photos/26796134/pexels-photo-26796134/free-photo-of-desert-rainbow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "https://images.pexels.com/photos/15898047/pexels-photo-15898047/free-photo-of-surfer-running-towards-ocean.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "https://images.pexels.com/photos/25186561/pexels-photo-25186561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "$8.00",
    },
    {
      title: "Orange",
      img: "https://images.pexels.com/photos/17692060/pexels-photo-17692060/free-photo-of-close-up-of-kitten.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "https://images.pexels.com/photos/4400679/pexels-photo-4400679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "https://images.pexels.com/photos/27200209/pexels-photo-27200209/free-photo-of-a-street-with-a-tree-in-bloom-and-people-walking.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "https://images.pexels.com/photos/26796134/pexels-photo-26796134/free-photo-of-desert-rainbow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "https://images.pexels.com/photos/15898047/pexels-photo-15898047/free-photo-of-surfer-running-towards-ocean.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "https://images.pexels.com/photos/25186561/pexels-photo-25186561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "$8.00",
    },
  ];

  return (
    <div className="gap-5 grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 w-full mt-16 max-lg:grid-cols-3">
      {list.map((item, index) => (
        <Card
          key={index}
          isPressable
          className={`bg-white/0 light:bg-white/0`}
          shadow="none"
        >
          <Link className="flex flex-col flex-1 w-full" href={`/board/1234567`}>
            <CardBody className="overflow-visible p-0">
              <Image
                alt={item.title}
                className="w-full object-cover h-[190px]"
                radius="sm"
                shadow="none"
                src={item.img}
                width="100%"
              />
            </CardBody>
          </Link>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <Link href={`/tasameem`}>
              <Avatar
                className={`w-5 h-5`}
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              />
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
