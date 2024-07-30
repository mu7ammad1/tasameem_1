"use client";
import { Tabs, Tab } from "@nextui-org/tabs";

import CardBody_Page from "./CardBody";

export const Tasamim = () => {
  return (
    <div className="flex w-full flex-col mt-16">
      <Tabs aria-label="CardBody_Page" dir="rtl" variant="light">
        <Tab key={`CardBody_Page`} title={`لك`}>
          <CardBody_Page />
        </Tab>
        <Tab key={`CardBody_Page1`} title={`المتابعين`}>
          CardBody_Page1
        </Tab>
      </Tabs>
    </div>
  );
};
