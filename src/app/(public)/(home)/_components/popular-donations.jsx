"use client";
import { Image } from "@/components/image";
import { BentoGrid } from "@/components/ui/bento-grid";
import Link from "next/link";
import { cn } from "@/lib/utils";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export function PopularDonations({ data }) {
    const section = data.generalDonationSection;

    return (
        <div className="w-full">
            <div className="max-w-7xl px-4 w-full mx-auto pt-10">
                <div className="flex flex-col justify-center items-center gap-3 pb-5">
                    <h5 className="font-normal">Popular Donations</h5>
                    <h2 className="max-w-3xl text-center">Transform lives with your contribution towards Society.</h2>
                </div>

                <BentoGrid className="max-w-5xl mx-auto p-5 grid grid-cols-1 sm:grid-cols-3">
                    {section.cards.map((item, index) => (
                        <BentoGridItem
                            key={index}
                            title={item.title}
                            description={item.image_alt}
                            image={item.image}
                            href={item.link}
                            className={getBentoItemClass(index)}
                        />
                    ))}
                </BentoGrid>
            </div>
        </div>
    );
}

function getBentoItemClass(index) {
    const spanMap = {
        0: "sm:col-span-2 sm:row-span-2",
        1: "sm:col-span-1 sm:row-span-1",
        2: "sm:col-span-1 sm:row-span-2",
        3: "sm:col-span-1 sm:row-span-1",
        4: "sm:col-span-1 sm:row-span-1",
        5: "sm:col-span-1 sm:row-span-1",
    };
    return spanMap[index] || "sm:col-span-1 sm:row-span-1";
}

export const BentoGridItem = ({
    className,
    title,
    image,
    href,
}) => {
    return (
        <Link
            href={href}
            className={cn(
                "group/bento row-span-1 relative overflow-hidden rounded-xl border border-neutral-200",
                "transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:shadow-none",
                "h-[200px] md:h-auto",
                className
            )}>
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={BASE_URL+image}
                    alt={title}
                    fill
                    className="object-cover w-full h-full transition-transform duration-500 group-hover/bento:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 23vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 transition duration-200 group-hover/bento:translate-y-2">
                <h5 className="text-white">{title}</h5>
            </div>
        </Link>
    );
};
