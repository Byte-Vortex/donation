"use client";

import { ProseInnerHtmlContainer } from "@/components/prose-container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  UnstyledAccordionTrigger
} from "@/components/ui/accordion";
import { Plus, Minus } from "lucide-react";
import { ShowMoreFadeContainer } from "@/components/ui/show-more-fade-container";
import { useState } from "react";

export function FaqSection({ data }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="mx-auto px-4 max-w-7xl w-full">
      <h3 className="text-3xl md:text-4xl font-bold">
        {"Frequently Asked Questions!"}
      </h3>
      <ShowMoreFadeContainer
        isShowMoreVisible={data.faqs.length >= 4}
        showMore={showMore}
        setShowMore={setShowMore}
      >
        <Accordion type="single" collapsible className="w-full mt-4">
          {data.faqs.map(
            (item, index) =>
              (index < 4 || showMore) && (
                <AccordionItem value={index + ""} key={index} className="rounded-xl my-3 bg-surface/10 border-none">
                  <UnstyledAccordionTrigger className="text-left w-full flex items-center justify-between py-4 px-4 text-sm sm:text-base font-semibold my-[2px] transition-all data-[state=open]:text-primary capitalize">
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
              )
          )}
        </Accordion>
      </ShowMoreFadeContainer>
    </div>
  );
}

