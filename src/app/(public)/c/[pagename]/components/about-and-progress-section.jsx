"use client";

import { DonateButton } from "../../_components/donate-button";
import DecorationProp from "@/assets/images/prop-2.svg";
import AnimatedCircularProgress from "@/components/ui/animated-circular-progress";
import { useState } from "react";
import clsx from "clsx";
import { Image } from "@/components/image";
import { YouTubeEmbed } from "@/components/ui/youtube-embed";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  UnstyledAccordionTrigger,
} from "@/components/ui/accordion";
import { ProseInnerHtmlContainer } from "@/components/prose-container";

export function AboutAndProgressSection({ data }) {
  return (
    <div className="bg-landing-tertiary py-12">
      <div className="space-y-16 max-w-7xl mx-auto px-4">
        <AboutSection aboutSection={data.aboutSection} />
        <ProgressSection data={data.campaignSection} />
      </div>
    </div>
  );
}

function AboutSection({ aboutSection }) {
  return (
    <div className="space-y-12">
      <Image
        loadingAnimation={false}
        className="block mx-auto"
        src={DecorationProp}
        alt=""
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="w-full max-h-max my-auto overflow-hidden rounded-xl min-h-28 shadow-landing-primary/60 shadow-lg">
          <div className="aspect-w-16 aspect-h-9 relative">
            <YouTubeEmbed autoplay={true} videoId={aboutSection.video} />
          </div>
        </div>

        <div className="flex flex-col gap-4 py-2">
          <h1 className="font-bold text-4xl">{aboutSection.title}</h1>

          <div className="space-y-3">
            <ProseInnerHtmlContainer
              className={clsx("text-landing-foreground")}
              html={aboutSection.summary}
            />
            {aboutSection.text && (
              <Accordion collapsible>
                <AccordionItem value="item-1" className="border-none group">
                  <AccordionContent className="prose prose-sm sm:prose-base text-sm md:text-base">
                    <ProseInnerHtmlContainer
                      className="text-current"
                      html={aboutSection.text}
                    />
                  </AccordionContent>

                  <UnstyledAccordionTrigger className="font-bold hover:underline justify-start">
                    <div className="block group-data-[state=open]:hidden">
                      Read More
                    </div>

                    <div className="hidden group-data-[state=open]:block">
                      Read Less
                    </div>
                  </UnstyledAccordionTrigger>
                </AccordionItem>
              </Accordion>
            )}
          </div>

          <DonateButton />
        </div>
      </div>

      <Image
        loadingAnimation={false}
        className="block mx-auto rotate-180"
        src={DecorationProp}
        alt=""
      />
    </div>
  );
}

function ProgressSection({ data }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      <div className="w-52 space-y-4 mx-auto my-auto">
        <AnimatedCircularProgress
          maxPercentage={(
            (parseFloat(data.acheived_goal) / parseFloat(data.goal)) *
            100
          ).toFixed(2)}
        />
      </div>

      <div className="text-center md:text-left md:col-span-2">
        <h3>{data.title}</h3>
        <p className="font-bold">
          <span className="text-landing-primary">
            {new Intl.NumberFormat("en-IN").format(data.acheived_goal)}
          </span>{" "}
          Square Feet raised out of a goal of{" "}
          <span className="text-landing-primary">
            {new Intl.NumberFormat("en-IN").format(data.goal)}
          </span>{" "}
          Square Feet.
        </p>
      </div>
    </div>
  );
}
