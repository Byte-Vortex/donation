"use client";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { forwardRef } from "react";

export function ProseHtmlContainer({ html, className }, ref) {
  return (
    <>
      <div
        className={cn(
          "prose prose-sm sm:prose-base",
          "prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg",
          "min-w-full text-justify",
          className
        )}
        ref={ref}
      >
        {typeof html === "string" ? parse(html) : null}
      </div>
    </>
  );
}

export const ProseInnerHtmlContainer = forwardRef(ProseHtmlContainer);
