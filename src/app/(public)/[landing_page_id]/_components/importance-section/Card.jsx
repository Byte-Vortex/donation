import { Image } from "@/components/image";

export default function Card({ src, importanceType = [], importanceText = "", importanceTitle = "" }) {
    return (
        <div className="overflow-hidden rounded-xl bg-landing-tertiary h-full">
            <div className="w-full h-64 relative">
                <Image
                sizes="512px"
                    fill
                    className="rounded-xl h-full w-full object-cover"
                    src={src} alt={importanceTitle} />
            </div>
            <div className="space-y-4 p-4 w-full">
                <p className="text-landing-primary font-semibold text-center">{importanceTitle}</p>

                <div className="font-semibold text-sm text-landing-foreground/80 text-center">
                    {
                        importanceType.split("\n").map((text, index) => (
                            <p key={index}>{text}</p>
                        ))
                    }
                </div>

                <p className="text-justify">{importanceText}</p>
            </div>
        </div>
    )
}