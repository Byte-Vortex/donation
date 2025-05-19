import { Image } from "@/components/image";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Card({
  src,
  importanceType = [],
  importanceText = "",
  importanceTitle = "",
  imageAlt = "",
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white h-full">
      <div className="w-full h-64 relative">
        <Image
          fill
          alt={imageAlt}
          className="rounded-xl h-full w-full object-cover"
          src={BASE_URL + src}
        />
      </div>
      <div className="space-y-4 p-4 w-full">
        <p className="text-primary font-semibold text-center text-base">
          {importanceTitle}
        </p>

        <div className="font-semibold text-sm text-foreground/80 text-center">
          {importanceType.split("\n").map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>

        <p className="text-justify">{importanceText}</p>
      </div>
    </div>
  );
}
