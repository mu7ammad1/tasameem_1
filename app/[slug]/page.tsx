"use client";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { Tabs, Tab } from "@nextui-org/react";

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
        <h1 className={`text-2xl mb-1 tracking-wide flex items-center gap-3`}>
          <p>twassul company</p>
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
        </h1>
        <div className={`flex justify-center items-center gap-5`}>
          <p className={`text-sm mb-1 tracking-widest`}>@{params.slug}</p>
          <p className={`text-sm mb-2 tracking-wide`}>3D Artist / Generalist</p>
        </div>
        <div className={`flex justify-center items-center gap-5`}>
          <p className={`text-sm mb-2 tracking-wide`}>
            Looking to start an interesting project 👋
          </p>
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
                <CardBody_Page />
              </div>
            </Tab>
            <Tab
              key="music"
              title={
                <div className="flex items-center space-x-2">
                  <svg
                    aria-hidden="true"
                    fill="none"
                    focusable="false"
                    height="24"
                    role="presentation"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path
                      d="M9.66984 13.9219C8.92984 13.9219 8.33984 14.5219 8.33984 15.2619C8.33984 16.0019 8.93984 16.5919 9.66984 16.5919C10.4098 16.5919 11.0098 15.9919 11.0098 15.2619C11.0098 14.5219 10.4098 13.9219 9.66984 13.9219Z"
                      fill="currentColor"
                    />
                    <path
                      d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM17.12 9.8C17.12 10.41 16.86 10.95 16.42 11.27C16.14 11.47 15.8 11.58 15.44 11.58C15.23 11.58 15.02 11.54 14.8 11.47L12.51 10.71C12.5 10.71 12.48 10.7 12.47 10.69V15.25C12.47 16.79 11.21 18.05 9.67 18.05C8.13 18.05 6.87 16.79 6.87 15.25C6.87 13.71 8.13 12.45 9.67 12.45C10.16 12.45 10.61 12.59 11.01 12.8V8.63V8.02C11.01 7.41 11.27 6.87 11.71 6.55C12.16 6.23 12.75 6.15 13.33 6.35L15.62 7.11C16.48 7.4 17.13 8.3 17.13 9.2V9.8H17.12Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Music</span>
                </div>
              }
            />
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
