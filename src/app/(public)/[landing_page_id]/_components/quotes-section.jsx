"use client";

import { RiDoubleQuotesL } from "react-icons/ri";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import clsx from "clsx";

export default function QuotesSection({ quoteSection, background }) {
  const bgClasses = {
    primary_color: "bg-landing-primary",
    secondary_color: "bg-landing-secondary",
    tertiary_color: "bg-landing-tertiary",
    transparent: "bg-landing-background",
    gradient_bt: "bg-landing-tertiary",
    gradient_tb: "bg-landing-tertiary",
  };

  const textClasses = {
    primary_color: "text-landing-background border-landing-background",
    secondary_color: "text-landing-background border-landing-background",
    tertiary_color: "text-landing-primary border-landing-primary",
    transparent: "text-landing-primary border-landing-primary",
    gradient_bt: "text-landing-primary border-landing-primary",
    gradient_tb: "text-landing-primary border-landing-primary",
  };

  const containerBg = bgClasses[background] ?? bgClasses.tertiary_color;
  const containerText = textClasses[background] ?? textClasses.tertiary_color;

  return (
    <div className={clsx(containerBg, "py-10")}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="space-y-8">
          <h1
            className={clsx(
              containerText,
              "font-extrabold text-center text-4xl md:text-5xl"
            )}
          >
            {quoteSection.title}
          </h1>

          <div
            className={clsx(
              "border-4 p-4 md:p-7 rounded-xl max-w-4xl mx-auto relative",
              containerText,
            )}
          >
            <ProseInnerHtmlContainer
              html={quoteSection.description}
              className={clsx("font-medium text-sm md:text-base", containerText)}
            />

            <div className="absolute left-4 -top-5 text-4xl" >
              <RiDoubleQuotesL className={clsx(containerText, containerBg)} />
            </div>

            <div className="absolute right-4 -bottom-4 rotate-180 text-4xl">
              <RiDoubleQuotesL className={clsx(containerText, containerBg)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
