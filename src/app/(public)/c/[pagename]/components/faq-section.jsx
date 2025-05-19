"use client";

import { ProseInnerHtmlContainer } from "@/components/prose-container";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  UnstyledAccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FaqSection({ data }) {
  const [viewMore, setViewMore] = useState(false);

  return (
    !!data?.length && (
      <div className="max-w-7xl mx-auto px-4 w-full flex flex-col gap-12">
        <div className="flex items-center gap-2 ml-3">
          <div className="font-bold h-10 w-10 flex items-center justify-center bg-landing-primary text-3xl rounded-full text-landing-background">
            ?
          </div>
          <h3 className="font-bold text-landing-primary">
            Frequently Asked Question!
          </h3>
        </div>
        <Accordion type="single" collapsible={true} className="w-full">
          {data.map((item, index) => {
            if (!viewMore && index >= 5) return null;

            return (
              <AccordionItem value={index + ""} key={index} className="rounded-xl my-3 bg-landing-tertiary border-none">
                <UnstyledAccordionTrigger className="capitalize w-full flex items-center justify-between py-4 transition-all [&[data-state=open]>svg]:rotate-180 text-landing-primary text-lg font-semibold my-[2px] px-4">
                  {item.title}
                  <span className="text-xl font-bold transition-all duration-200">
                    <Plus className="group-data-[state=open]:hidden"></Plus>
                    <Minus className="hidden group-data-[state=open]:inline"></Minus>
                  </span>
                </UnstyledAccordionTrigger>
                <AccordionContent className="text-base px-4">
                  <ProseInnerHtmlContainer html={item.text} />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        {data.length > 5 && (
          <button
            onClick={() => setViewMore((state) => !state)}
            className="mx-auto rounded-xl px-6 py-2 border-landing-primary border-2 text-landing-primary hover:bg-landing-primary hover:text-landing-background duration-150"
          >
            View {viewMore ? "More" : "Less"}
          </button>
        )}
      </div>

    )
  );
}
