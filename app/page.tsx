import { Input } from "@nextui-org/input";

import { title, subtitle } from "@/components/primitives";
import CardBody_Page from "@/components/ui/CardBody";
import { SearchIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-5 py-10">
      <div className="inline-block max-w-full text-center justify-center">
        <h1 className={title()}>Make&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
        <br />
        <h1 className={title()}>websites regardless of your design.</h1>

        <h2 className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </h2>
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
        <CardBody_Page />
      </div>
    </section>
  );
}
