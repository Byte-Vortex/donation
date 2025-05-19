"use client"
import { AiOutlineUnorderedList as ListViewIcon } from "react-icons/ai"
import { BsFillGridFill as GridViewIcon } from "react-icons/bs"
import { useState } from "react"
import clsx from "clsx"
import * as Tabs from "@radix-ui/react-tabs"
import { useDonationFormStore } from "../../c/_store/donation-form.store"
import { Image } from "@/components/image"

export default function DonationCardsSection({ sevaName, donationTypes }) {
  const [viewType, setViewType] = useState("grid")

  const setSelectedSeva = useDonationFormStore((state) => state.setSelectedSeva)

  return donationTypes.length === 1 &&
    donationTypes[0].cards.length === 1 ? null : (

    <div>
      <div className="max-w-7xl mx-auto py-10 space-y-12 md:space-y-16 px-4">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center pl-4 pr-2 py-[6px] rounded-xl bg-landing-tertiary/70 border-zinc-400">
            <h3 className="text-base sm:text-lg uppercase overflow-auto scrollbar-hide relative tracking-wide">
              {sevaName}
            </h3>

            <div className="flex items-center justify-center text-base rounded-xl p-1 bg-landing-primary">
              <button
                className={`py-1 px-2 rounded-[7px] duration-150 ${viewType === "list"
                  ? "bg-landing-background text-landing-primary"
                  : "text-landing-background"
                  }`}
                onClick={setViewType.bind(null, "list")}
              >
                <ListViewIcon />
              </button>

              <button
                className={`py-1 px-2 rounded-[7px] duration-150 ${viewType === "grid"
                  ? "bg-landing-background text-landing-primary"
                  : "text-landing-background"
                  }`}
                onClick={setViewType.bind(null, "grid")}
              >
                <GridViewIcon />
              </button>
            </div>
          </div>

          {donationTypes.length > 1 ? (
            <Tabs.Root
              orientation="horizontal"
              defaultValue={donationTypes[0].typeName}
            >
              <Tabs.List as="div" className="flex w-full overflow-auto mb-4">
                {donationTypes.map((tab) => (
                  <Tabs.Trigger
                    value={tab.typeName}
                    key={tab.typeName}
                    className="w-max min-w-max p-2 outline-none text-sm font-medium border-b-4 leading-5 border-landing-tertiary data-[state=active]:border-landing-primary duration-150"
                  >
                    {tab.typeName}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              {/* <div className="flex flex-grow"> */}

              {donationTypes.map((tab) => (
                <Tabs.Content
                  value={tab.typeName}
                  key={tab.typeName}
                  as="div"
                  className={clsx(
                    "flex flex-wrap items-center justify-between w-full",
                    viewType === "grid" ? "gap-6" : "gap-0"
                  )}
                >
                  {tab.cards.map((card, index) => (
                    <Card
                      setSelectedSeva={setSelectedSeva}
                      key={index}
                      viewType={viewType}
                      count={index + 1}
                      donationId={card.id}
                      donationTitle={card.title}
                      donationImage={card.imagelink}
                    />
                  ))}
                </Tabs.Content>
              ))}

              {/* </div> */}
            </Tabs.Root>
          ) : (
            <div
              className={clsx(
                "flex flex-wrap justify-center xl:justify-between items-center",
                viewType === "grid" ? "gap-4" : "gap-0"
              )}
            >
              <div
                className={clsx(
                  "flex flex-wrap items-center w-full",
                  viewType === "grid" ? "gap-6" : "gap-0"
                )}
              >
                {donationTypes[0].cards.map((card, index) => (
                  <Card
                    donationImage={card.imagelink}
                    setSelectedSeva={setSelectedSeva}
                    key={index}
                    viewType={viewType}
                    count={index + 1}
                    donationId={card.id}
                    donationTitle={card.title}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Card({
  donationTitle,
  viewType,
  setSelectedSeva,
  donationId,
  donationImage,
  count,
}) {
  return viewType === "grid" ? (
    <div className="rounded-xl bg-gradient-to-b from-landing-primary to-landing-secondary shadow-md w-full sm:max-w-[48%] sm:min-w-[48%] xl:max-w-[32%] xl:min-w-[32%] h-40 flex gap-2 overflow-hidden">
      <div className=" max-w-[10rem] min-w-[10rem] h-full rounded-xl overflow-hidden relative">
        <Image
          fill
          sizes="320px"
          title={donationTitle}
          className="h-full w-full object-cover hover:scale-110 duration-300"
          src={donationImage}
          alt={donationTitle}
        />
      </div>

      <div className="p-2 flex flex-col w-full text-landing-background">
        <span className="font-semibold">{donationTitle}</span>

        <div className="ml-auto mt-auto">
          <a
            href="#form"
            className="block bg-landing-background hover:bg-landing-tertiary rounded-xl py-2 px-6 text-landing-primary font-semibold duration-150"
            onClick={setSelectedSeva.bind(null, donationId)}
          >
            Donate
          </a>
        </div>
      </div>
    </div>
  ) : (
    <div className="p-4 group flex justify-between w-full odd:bg-landing-tertiary/30 even:bg-landing-tertiary/70 items-center first:rounded-t-xl last:rounded-b-xl last:shadow-md">
      <h5 className="font-semibold space-x-4 group-hover:underline">
        <span>{count}.</span> <span>{donationTitle}</span>
      </h5>
      <a
        href="#form"
        onClick={setSelectedSeva.bind(null, donationId)}
        className="block bg-landing-primary rounded-xl text-white font-semibold hover:bg-landing-background hover:text-landing-foreground duration-150 py-1 px-4"
      >
        Donate
      </a>
    </div>
  )
}
