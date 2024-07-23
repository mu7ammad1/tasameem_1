import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { title } from "@/components/primitives";
import CardBody_Page from "@/components/ui/CardBody";
export default function Page({ params }: { params: { slug: string } }) {
  return (
    <main
      className={`w-full flex justify-center items-center flex-1 flex-col tracking-widest`}
    >
      <Image
        alt="NextUI hero Image"
        className="rounded-full object-cover"
        height={100}
        src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
        width={100}
      />
      <div
        className={title({
          className: `flex flex-col mt-3 justify-center items-center `,
        })}
      >
        <h1 className={`text-2xl mb-1 tracking-wide`}>twassul company</h1>
        <div className={`flex justify-center items-center gap-5`}>
          <p className={`text-sm mb-1 tracking-widest`}>@{params.slug}</p>
          <p className={`text-sm mb-2 tracking-wide`}>3D Artist / Generalist</p>
        </div>
        <Button
          className="leading-8 tracking-widest mt-2 w-40 font-medium"
          color="default"
        >
          Follow
        </Button>
      </div>
      <div
        className={`w-full flex justify-center items-center gap-7 mt-10 *:text-sm`}
      >
        <Link
          className={`underline underline-offset-[10px]`}
          color="foreground"
          href="/boards"
        >
          Boards
        </Link>
        <Link color="foreground" href={`/${params.slug}/collection`}>
          Collection
        </Link>
        <Link color="foreground" href={`/${params.slug}/about`}>
          About
        </Link>
      </div>
      <div>
        <CardBody_Page />
      </div>
    </main>
  );
}
