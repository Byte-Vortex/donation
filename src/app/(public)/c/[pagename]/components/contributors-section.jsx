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

export default function ContributorsSection({ data }) {
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
    <div id="contributors" className="max-w-7xl mx-auto px-4 py-20 w-full">
      <h3 className="font-bold text-center mb-8">Respected Contributors</h3>

      <Tabs tabs={tabs} tab={tab} onTabChange={(tab) => setTab(tab)} />

      <div>
        <DonorList
          key={tab}
          list={tabs.find((localTab) => localTab.value === tab)?.list ?? []}
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
  }, [selected]);

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

function DonorList({ list }) {
  return (
    <div className="flex flex-col gap-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.length ? (
          list.map((item, index) => {
            if (index + 1 > 9) return null;

            return <Card key={index} item={item} />;
          })
        ) : (
          <p className="text-center font-bold text-lg col-span-full">
            Go ahead and do the first donation of today!
          </p>
        )}
      </div>

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
                return <Card key={index} item={item} />;
              })}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function Card({ item }) {
  return (
    <div className="w-full p-2 rounded-lg flex bg-landing-tertiary items-center">
      <div className="flex gap-4">
        <div className="text-lg font-bold rounded-full h-16 w-16 min-h-16 min-w-16 max-w-16 max-h-16 flex items-center justify-center bg-landing-background text-landing-foreground">
          {item.name[0]}
        </div>
        <div className="py-2">
          <div className="font-bold flex gap-x-2 flex-wrap">
            <span className="text-landing-secondary">{item.name}</span>
            <span>donated</span>
            <span className="text-landing-secondary">
              {item.numberofsqft} Sq. ft.
            </span>
          </div>
          <div className="text-sm">
            {formatDistanceToNow(item.date, { addSuffix: true })}
          </div>
        </div>
      </div>
    </div>
  );
}
