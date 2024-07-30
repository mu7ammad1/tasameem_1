import { Input } from "@nextui-org/input";

import { subtitle } from "@/components/primitives";
import { SearchIcon } from "@/components/icons";
import { Tasamim } from "@/components/ui/tasamim";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-5 py-10 w-full">
      <div className="inline-block max-w-full text-center justify-center w-full">
        <div dir="auto">
          <h1
            className={`tracking-normal inline font-semibold text-[2.3rem] lg:text-5xl leading-9`}
          >
            انطلق في&nbsp;
          </h1>
          <h1
            className={`tracking-normal inline font-semibold from-[#FF1CF7] to-[#b249f8] text-[2.3rem] lg:text-5xl leading-9 bg-clip-text text-transparent bg-gradient-to-b`}
          >
            رحلة إلهام&nbsp;
          </h1>
          <br />
          <h1
            className={`tracking-normal font-semibold text-[2.3rem] lg:text-5xl leading-9 my-5 max-md:my-3 max-md:leading-[45px]`}
          >
            مع أعمال المصممين والوكالات الأعلى تقييماً عالميًا
          </h1>
          <h2 className={subtitle({ class: "mt-4" })}>
            غُص في بحر من الإبداع مع أفضل المصممين والمبدعين في العالم العربي،
            واكتشف كيف يتحول الحلم إلى فن
          </h2>
        </div>
        <div className="w-full flex justify-center items-center tracking-wide">
          <Input
            aria-label="Search"
            classNames={{
              inputWrapper: "bg-default-100 py-6",
              input: "text-xl p-10",
              base: "w-1/2 my-5 rounded-xl max-md:w-full",
            }}
            dir="rtl"
            labelPlacement="outside"
            placeholder="بحث...."
            startContent={
              <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
          />
        </div>
        <div />
        <Tasamim />
      </div>
    </section>
  );
}
