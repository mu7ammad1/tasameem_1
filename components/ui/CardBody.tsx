import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Link } from "@nextui-org/link";

import { createClient } from "@/utils/supabase/client";

export default function CardBody_Page({ sss }: any) {
  async function getUserData(username: string) {
    const supabase = createClient();

    try {
      let { data: user, error } = await supabase
        .from("profiles")
        .select("avatar") // يمكنك تحديد الأعمدة التي تريدها بدلاً من "*"
        .eq("username", username)
        .single();

      if (error) throw error;

      return user?.avatar;
    } catch (error) {
      console.error("Error fetching user data:", error);

      return null; // أو يمكنك معالجة الخطأ بطريقة أخرى
    }
  }

  return (
    <div className="gap-3 grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 w-full mt-5 max-lg:grid-cols-3">
      {sss.map(async (item: any, index: number) => (
        <Card
          key={index}
          isPressable
          className={`bg-white/0 light:bg-white/0`}
          shadow="none"
        >
          <Link
            className="flex flex-col flex-1 w-full"
            href={`/board/${item.id}`}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                alt={item.title}
                className="w-full object-cover h-60"
                radius="sm"
                shadow="none"
                src={`https://hsmahnunqgbyxyjzikko.supabase.co/storage/v1/object/public/avatars/avatar/${item.background}`}
                width="100%"
              />
            </CardBody>
          </Link>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <Link href={`/Tasamim`}>
              <Avatar
                className={`w-5 h-5`}
                src={`https://hsmahnunqgbyxyjzikko.supabase.co/storage/v1/object/public/avatars/avatar/${await getUserData(item.username)}`}
              />
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
