"use client";

import { createRef, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { formatDistanceToNow } from "date-fns";
import { useWindowResize } from "@/hooks/use-window-resize";
import ContributorsCarousel from "./contributors-section/contributors-carousel";

export default function ContributorsSection({ contributorsSection }) {
  const data = contributorsSection;
  const [tab, setTab] = useState("recent");

  const tabs = [
    {
      label: "Recent",
      value: "recent",
      list: data.recent,
    },
    {
      label: "Most Generous",
      value: "generous",
      list: data.generous,
    },
  ];

  return (
    <div
      id="contributors"
      className="max-w-7xl mx-auto px-4 py-10 w-full"
    >
      <h3 className="font-bold text-center mb-8">Respected Contributors</h3>

      <Tabs tabs={tabs} tab={tab} onTabChange={(tab) => setTab(tab)} />

      <div>
        <DonorList
          key={tab}
          list={tabs.find((localTab) => localTab.value === tab)?.list ?? []}
          isVisible={tab === tabs.find((localTab) => localTab.value === tab)}
        />
      </div>
    </div>
  );
}

function Tabs({ tabs, tab, onTabChange }) {
  const windowWidth = useWindowResize();

  const activeRef = createRef();
  const none = createRef();
  const [selected, setSelected] = useState(tab);
  const [offset, setOffset] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const activeElement = activeRef.current;
    setOffset(activeElement.offsetLeft);
    setWidth(activeElement.clientWidth);
  }, [selected, activeRef, windowWidth]);

  useEffect(() => {
    onTabChange(selected);
  }, [selected,onTabChange]);

  return (
    <div className="mx-auto max-w-max rounded-xl relative z-[1] overflow-hidden bg-landing-tertiary cursor-pointer mb-10">
      {tabs.map((tab) => (
        <button
          ref={selected === tab.value ? activeRef : none}
          key={tab.value}
          onClick={setSelected.bind(null, tab.value)}
          className={clsx(
            "py-1 px-4 font-bold sm:py-3 sm:px-8 relative duration-300 z-[2]",
            selected === tab.value && "text-landing-background"
          )}
        >
          {tab.label}
        </button>
      ))}

      <div
        style={{
          width: `${width}px`,
          left: `${offset}px`,
        }}
        className={clsx(
          "bg-landing-primary rounded-xl duration-150 h-full absolute z-[1] left-0 top-0"
        )}
      />
    </div>
  );
}

function DonorList({ list, isVisible }) {
  return (
    <div className="flex flex-col gap-8">
      {list.length ? (
        <div className="relative overflow-hidden">
          <ContributorsCarousel items={list} isVisible={isVisible} />

          <div className="absolute z-[1] inset-y-0 left-0 h-full w-1/5 bg-gradient-to-r from-landing-background to-transparent pointer-events-none"></div>

          <div className="absolute z-[1] inset-y-0 right-0 h-full  w-1/5 bg-gradient-to-l from-landing-background to-transparent pointer-events-none"></div>
        </div>
      ) : (
        <p className="text-center font-bold text-lg col-span-full">
          Go ahead and do the first donation of today!
        </p>
      )}

      {list.length >= 10 && (
        <Dialog>
          <DialogTrigger asChild>
            <button className="max-w-max mx-auto border-outline px-4 py-2 rounded-xl hover:bg-landing-secondary border-2 border-landing-primary hover:border-landing-secondary hover:text-landing-background duration-150">
              View More
            </button>
          </DialogTrigger>
          <DialogContent className="bg-landing-background">
            <DialogHeader>
              <DialogTitle>List of Donors</DialogTitle>
            </DialogHeader>
            <div className="max-h-[550px] overflow-auto p-4 space-y-4">
              {list.map((item, index) => {
                return <DonorCard key={index} item={item} />;
              })}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export function DonorCard({ item }) {
  return (
    <div className="w-full px-2 py-1 rounded-lg flex bg-landing-tertiary items-center">
      <div className="flex gap-2 items-center">
        <div className="text-base sm:text-lg font-bold rounded-full min-h-10 min-w-10 sm:min-h-12 sm:min-w-12 flex items-center justify-center bg-landing-background text-landing-foreground">
          {item.name[0]}
        </div>
        <div>
          <div className="flex flex-wrap flex-col">
            <span className="font-bold text-sm sm:text-base text-landing-secondary line-clamp-1">
              {item.name}
            </span>
            <span className="block text-sm font-semibold">
              Donated{" "}
              <span className="text-landing-primary">₹ {item.amount}</span>
            </span>
          </div>
          <div className="text-xs ">
            {formatDistanceToNow(item.date, { addSuffix: true })}
          </div>
        </div>
      </div>
    </div>
  );
}
