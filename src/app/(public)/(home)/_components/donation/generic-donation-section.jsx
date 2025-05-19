"use client";

import clsx from "clsx";
import { Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import { GoArrowRight as ArrowIcon } from "react-icons/go";
import { Image } from "@/components/image";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export function GenericDonationSection({ cards, title, limit = 8 }) {
  return (
    <div className="">
      <div className="w-full max-w-7xl mx-auto px-4">
        <h3 className="mb-4 text-3xl md:text-4xl font-bold">{title}</h3>
        <div className="flex flex-wrap justify-center xl:justify-between gap-y-3 sm:gap-y-4 gap-x-3 sm:gap-x-6">
          {(function () {
            let arr = [];
            for (let i = 0; i < cards.length && i < limit; i++) {
              let ele = <GenericCard key={i} card={cards[i]} />;
              arr.push(ele);
            }
            return arr;
          })()}
        </div>

        {cards.length > limit && <ViewMore cards={cards} startIndex={limit} />}
      </div>
    </div>
  );
}

function ViewMore({ cards, startIndex }) {
  const [isSectionOpen, setIsSectionOpen] = useState(false);

  return (
    <div className="w-full flex flex-col mt-8">
      <Transition
        as={Fragment}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        show={isSectionOpen}
      >
        <div
          className={clsx(
            "flex flex-wrap justify-center xl:justify-between gap-8"
          )}
        >
          {(function () {
            let arr = [];
            for (let i = startIndex; i < cards.length; i++) {
              let ele = <GenericCard key={i} card={cards[i]} />;
              arr.push(ele);
            }
            return arr;
          })()}
        </div>
      </Transition>

      <button
        onClick={() => setIsSectionOpen((state) => !state)}
        className="rounded-full py-1 w-36 bg-white/20 border-black hover:underline duration-150 mx-auto border mt-6"
      >
        View&nbsp;{isSectionOpen ? "Less" : "More"}
      </button>
    </div>
  );
}

export function GenericCard({ card, className }) {
  return (
    <Link
      href={card.link}
      className={clsx(
        "w-full max-w-[48%] sm:max-w-[280px] flex-grow flex flex-col text-center font-semibold gap-1 group",
        className
      )}
    >
      <div className="flex-grow w-full rounded-xl overflow-hidden relative group h-[184px] min-[426px]:h-[234px] xs:h-[254px] sm:h-[306px]">
        <div className="relative z-10 gap-4 p-3  flex-col justify-between h-full duration-500 card-content opacity-0 group-hover:opacity-100 text-background hidden md:flex">
          <div className="flex flex-col h-full space-y-3">
            <h5 className="text-base font-bold text-left tracking-wider mt-auto">
              {card.title}
            </h5>
            <p className="text-sm text-left">{card.hoverText}</p>

            <div className="px-2 py-3 text-sm rounded-xl bg-primary hover:bg-white hover:text-foreground duration-150">
              Donate
            </div>
          </div>
        </div>

        <div className="absolute w-full h-full top-0 left-0 duration-500 group-hover:brightness-[0.25]">
          <div className="w-full h-full relative group-hover:scale-105 duration-150 group-hover:brightness-50 ">
            <Image
              sizes="560px"
              fill
              className="object-cover w-full h-full"
              src={BASE_URL + card.image}
              alt={card.image_alt}
            />
          </div>
        </div>
      </div>
      <div className="group-hover:underline flex gap-2 items-center justify-center">
        <span className="text-base xs:text-lg">{card.title}</span>
        <span className="h-4 w-4 items-center justify-center bg-text rounded-full hidden text-white text-[10px]">
          <ArrowIcon className="group-hover:-rotate-45 duration-150" />
        </span>
      </div>
    </Link>
  );
}

export function GenericSliderCard({ card, className }) {
  return (
    <Link
      href={card.link}
      className={clsx(
        "w-full max-w-[280px] h-[330px] flex-grow flex flex-col text-center font-semibold gap-1 group",
        className
      )}
    >
      <div className="flex-grow w-full h-full rounded-xl overflow-hidden relative group">
        <div className="relative z-10 gap-4 p-3 flex flex-col justify-between h-full duration-500 card-content opacity-0 group-hover:opacity-100 text-background">
          <div className="flex flex-col h-full space-y-3">
            <h5 className="text-base font-bold text-left tracking-wider mt-auto">
              {card.title}
            </h5>
            <p className="text-sm text-left">{card.hoverText}</p>

            <div className="px-2 py-3 text-sm rounded-xl bg-primary hover:bg-white hover:text-foreground duration-150">
              Donate
            </div>
          </div>
        </div>

        <div className="absolute w-full h-full top-0 left-0 duration-500 group-hover:brightness-[0.25]">
          <div className="w-full h-full relative group-hover:scale-105 duration-150 group-hover:brightness-50">
            <Image
              sizes="560px"
              fill
              className="object-cover w-full h-full"
              src={BASE_URL + card.image}
              alt={card.image_alt}
            />
          </div>
        </div>
      </div>
      <div className="group-hover:underline flex gap-2 items-center justify-center">
        <span>{card.title}</span>
        <span className="h-4 w-4 flex items-center justify-center bg-text rounded-full text-white text-[10px]">
          <ArrowIcon className="group-hover:-rotate-45 duration-150" />
        </span>
      </div>
    </Link>
  );
}
