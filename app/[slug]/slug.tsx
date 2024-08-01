"use client";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { Tabs, Tab } from "@nextui-org/tabs";

import { title } from "@/components/primitives";
import CardBody_Page from "@/components/ui/CardBody";
export default function Slug({
  params,
}: {
  params: {
    slug: string;
    full_name: string;
    verification: boolean;
    bio: string;
    work: string;
    boar: any;
    avatar: string;
  };
}) {
  return (
    <main
      className={`w-full flex justify-center items-center flex-1 flex-col tracking-widest`}
    >
      <Image
        alt="NextUI hero Image"
        className="rounded-full object-cover"
        height={100}
        src={`https://hsmahnunqgbyxyjzikko.supabase.co/storage/v1/object/public/avatars/avatar/${params.avatar}`}
        width={100}
      />
      <div
        className={title({
          className: `flex flex-col mt-3 justify-center items-center `,
        })}
      >
        <h1 className={`text-2xl mb-1 tracking-wide flex items-center gap-3`}>
          <p>{params.full_name}</p>
          {params.verification === true && (
            <svg
              className="size-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                fillRule="evenodd"
              />
            </svg>
          )}
        </h1>
        <div className={`flex justify-center items-center gap-5`}>
          <p className={`text-sm mb-1 tracking-widest`}>
            @{params.slug.toLowerCase()}
          </p>
          <p className={`text-sm mb-2 tracking-wide`}>{params.work}</p>
        </div>
        <div className={`flex justify-center items-center gap-5`}>
          <p className={`text-sm mb-2 tracking-wide`}>{params.bio}</p>
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
        <div className="flex w-full flex-col justify-center items-center">
          <Tabs color="primary" variant="underlined">
            <Tab
              key="photos"
              title={
                <div className="flex items-center space-x-2">
                  <svg
                    aria-hidden="true"
                    className="lucide lucide-library"
                    fill="none"
                    focusable="false"
                    height="20"
                    role="presentation"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m16 6 4 14" />
                    <path d="M12 6v14" />
                    <path d="M8 8v12" />
                    <path d="M4 4v16" />
                  </svg>
                  <span>Boards</span>
                </div>
              }
            >
              <div>
                <CardBody_Page avatar={params.avatar} sss={params.boar} />
              </div>
            </Tab>
            <Tab
              key="videos"
              title={
                <div className="flex items-center space-x-2">
                  <svg
                    aria-hidden="true"
                    className="size-6"
                    fill="none"
                    focusable="false"
                    height="20"
                    role="presentation"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span>About</span>
                </div>
              }
            />
          </Tabs>
        </div>
      </div>
    </main>
  );
}
