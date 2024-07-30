import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Link } from "@nextui-org/link";

export default function CardBody_Page() {
  const list = [
    {
      title: "Orange",
      img: "https://images.pexels.com/photos/17786378/pexels-photo-17786378/free-photo-of-silhouettes-of-people-sitting-by-the-window-in-an-apartment-with-the-view-of-the-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      board_id: "13547648",
    },
    {
      title: "Tangerine",
      img: "https://images.pexels.com/photos/4400679/pexels-photo-4400679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      board_id: "87954835",
    },
    {
      title: "Raspberry",
      img: "https://images.pexels.com/photos/27200209/pexels-photo-27200209/free-photo-of-a-street-with-a-tree-in-bloom-and-people-walking.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      board_id: "48950253",
    },
    {
      title: "Lemon",
      img: "https://images.pexels.com/photos/27108021/pexels-photo-27108021/free-photo-of-a-building-with-a-red-and-white-clock-on-it.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      board_id: "45868754",
    },
    {
      title: "Avocado",
      img: "https://images.pexels.com/photos/15898047/pexels-photo-15898047/free-photo-of-surfer-running-towards-ocean.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      board_id: "45687450",
    },
    {
      title: "Lemon 2",
      img: "https://images.pexels.com/photos/25186561/pexels-photo-25186561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      board_id: "45968520",
    },
    {
      title: "Orange",
      img: "https://images.pexels.com/photos/17692060/pexels-photo-17692060/free-photo-of-close-up-of-kitten.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      board_id: "9874530",
    },
    {
      title: "Tangerine",
      img: "https://images.pexels.com/photos/4400679/pexels-photo-4400679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      board_id: "98746",
    },
    {
      title: "Raspberry",
      img: "https://images.pexels.com/photos/27200209/pexels-photo-27200209/free-photo-of-a-street-with-a-tree-in-bloom-and-people-walking.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      board_id: "4156845",
    },
    {
      title: "Lemon",
      img: "https://images.pexels.com/photos/26796134/pexels-photo-26796134/free-photo-of-desert-rainbow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      board_id: "19874536",
    },
    {
      title: "Avocado",
      img: "https://images.pexels.com/photos/15898047/pexels-photo-15898047/free-photo-of-surfer-running-towards-ocean.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      board_id: "651452646",
    },
    {
      title: "Lemon 2",
      img: "https://images.pexels.com/photos/25186561/pexels-photo-25186561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      board_id: "13547648",
    },
    {
      title: "Orange",
      img: "https://images.pexels.com/photos/17692060/pexels-photo-17692060/free-photo-of-close-up-of-kitten.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      board_id: "13547648",
    },
    {
      title: "Tangerine",
      img: "https://images.pexels.com/photos/4400679/pexels-photo-4400679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      board_id: "13547648",
    },
    {
      title: "Raspberry",
      img: "https://images.pexels.com/photos/27200209/pexels-photo-27200209/free-photo-of-a-street-with-a-tree-in-bloom-and-people-walking.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      board_id: "135476480",
    },
    {
      title: "Lemon",
      img: "https://images.pexels.com/photos/26796134/pexels-photo-26796134/free-photo-of-desert-rainbow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      board_id: "13547648",
    },
    {
      title: "Avocado",
      img: "https://images.pexels.com/photos/15898047/pexels-photo-15898047/free-photo-of-surfer-running-towards-ocean.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      board_id: "135476480",
    },
    {
      title: "Lemon 2",
      img: "https://images.pexels.com/photos/25186561/pexels-photo-25186561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      board_id: "13547648",
    },
  ];

  return (
    <section>
      <div className="gap-3 grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 w-full mt-5 max-lg:grid-cols-3">
        {list.map((item, index) => (
          <Card
            key={index}
            isPressable
            className={`bg-white/0 light:bg-white/0`}
            shadow="none"
          >
            <Link
              className="flex flex-col flex-1 w-full"
              href={`/board/${item.board_id}`}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  alt={item.title}
                  className="w-full object-cover h-60"
                  radius="sm"
                  shadow="none"
                  src={item.img}
                  width="100%"
                />
              </CardBody>
            </Link>
            <CardFooter className="text-small justify-between">
              <b>{item.title}00</b>
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
