import Link from "next/link";
import dynamic from "next/dynamic";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";

import { title } from "@/components/primitives";

const SectionBady = dynamic(() => import("@/components/ui/SectionBady"), {
  ssr: false,
});

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <main
      className={`w-full flex justify-center items-center flex-1 flex-col gap-5 tracking-widest`}
    >
      <section className="flex justify-between items-center gap-3 w-full max-w-4xl sticky top-0 z-50 bg-background px-2 py-4">
        <div
          className={title({
            className: `flex justify-center items-center gap-3`,
          })}
        >
          <Link href={`/Tasamim`}>
            <Image
              alt="NextUI hero Image"
              className="rounded-full object-cover"
              height={32}
              src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
              width={32}
            />
          </Link>
          <div className="flex justify-center items-center gap-5">
            <Link href={`/Tasamim`}>
              <h1
                className={`text-base font-normal tracking-wide flex flex-col`}
              >
                {params.slug}
                <span className="text-xs">Designer</span>
              </h1>
            </Link>
            <Button
              className="leading-8 tracking-widest font-medium"
              color="default"
              size="sm"
              variant="flat"
            >
              Follow
            </Button>
          </div>
        </div>
        <div
          className={title({
            className: `flex justify-center items-center gap-3`,
          })}
        >
          <div
            aria-label="Like"
            className="p-2 border-[0.5px] border-stone-200/40 rounded-full hover:border-stone-200 duration-500"
          >
            <svg
              className="size-5 fill-stone-800 stroke-stone-800"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            aria-label="Like"
            className="p-2 border-[0.5px] border-stone-200/40 rounded-full hover:border-stone-200 duration-500"
          >
            <svg
              className="size-5 fill-stone-800 stroke-stone-800"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>

      <section className="flex justify-between items-center gap-3 w-full max-w-4xl">
        <SectionBady />
      </section>
      <section className="flex justify-between items-center gap-3 w-full max-w-4xl">
        <SectionBady />
      </section>
    </main>
  );
}
