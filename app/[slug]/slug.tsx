import { Avatar } from "@nextui-org/avatar";

import { title } from "@/components/primitives";
import CardBody_Page from "@/components/ui/CardBody";
import IsFollow from "@/components/ui/isFollow";

import B from "./B";
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
    followingId: any;
    followerId: any;
    username: string
  };
}) {
  return (
    <main
      className={`w-full flex justify-center items-center flex-1 flex-col tracking-widest`}
    >
      <Avatar
        isBordered
        className={`w-[100px] h-[100px]`}
        src={`${params.avatar}`}
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
        <IsFollow
          followerId={params.followerId}
          followingId={params.followingId}
        />
      </div>
      <div
        className={`w-full flex justify-center items-center gap-7 mt-10 *:text-sm`}
      >
        <div className="flex w-full flex-col justify-center items-center">
          <B />
          <div>
            <CardBody_Page sss={params.boar} />
          </div>
        </div>
      </div>
    </main>
  );
}
