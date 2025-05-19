import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ProseInnerHtmlContainer } from "@/components/prose-container";

export function ReadMoreTextSection({
  innerHtml,
  clampClassName = "line-clamp-4",
}) {
  const contentRef = useRef(null);
  const [readMore, setReadMore] = useState(true);
  const [isClamped, setClamped] = useState(false);

  useEffect(() => {
    if (contentRef?.current) {
      setClamped(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  }, []);

  return (
    <div>
      <ProseInnerHtmlContainer
        ref={contentRef}
        html={innerHtml}
        className={clsx(readMore && clampClassName)}
      />
      {isClamped && (
        <button
          onClick={() => setReadMore((state) => !state)}
          className="font-bold text-foreground/70 hover:underline"
        >
          Read {readMore ? "More" : "Less"}
        </button>
      )}
    </div>
  );
}
