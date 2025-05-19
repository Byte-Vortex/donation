"use client";

import { cn } from "@/lib/utils";
import NextImage from "next/image";
import { useEffect, useState } from "react";

export function Image({
  src,
  fill = false,
  className = "",
  loadingAnimation = true,
  alt = "",
  onLoad = null,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setHidden(false);
  }, [src]);

  useEffect(() => {
    if (!loaded) return;
    setTimeout(() => setHidden(true), 3000);
  }, [loaded]);

  const isGif = typeof src === "string" && src.toLowerCase().endsWith(".gif");
  const isExternal = typeof src === "string" && src.startsWith("http");

  return (
    <NextImage
      src={src}
      fill={fill}
      unoptimized={isGif || isExternal}
      className={cn(
        "bg-cover bg-center bg-transparent",
        loadingAnimation && !loaded && "bg-foreground/20 animate-pulse",
        className
      )}
      alt={alt|| "Image"}
      onLoad={() => {
        if (typeof onLoad === "function") onLoad();
        setLoaded(true);
      }}
      {...props}
    />
  );
}
