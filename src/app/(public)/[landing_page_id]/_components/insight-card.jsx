import { NumberTicker } from "@/components/fancy/number-ticker";
import { Separator } from "@/components/ui/separator";
import clsx from "clsx";

export function InsightCard({ insightsData, background }) {
    const bgClasses = {
        primary_color: "bg-landing-primary",
        secondary_color: "bg-landing-secondary",
        tertiary_color: "bg-landing-tertiary",
        transparent: "bg-landing-background",
        gradient_bt: "bg-landing-tertiary",
        gradient_tb: "bg-landing-tertiary",
    };

    const textClasses = {
        primary_color: "text-landing-background",
        secondary_color: "text-landing-background ",
        tertiary_color: "text-landing-primary",
        transparent: "text-landing-primary",
        gradient_bt: "text-landing-primary",
        gradient_tb: "text-landing-primary",
    };


    const containerBg = bgClasses[background] ?? bgClasses.tertiary_color;
    const containerText = textClasses[background] ?? textClasses.tertiary_color;

    return (
        <section className={clsx(containerBg, "py-14", containerText)}>
            <div className="max-w-6xl mx-auto px-4 flex flex-wrap gap-8 lg:gap-0 flex-col lg:flex-row">
                <div className="basis-auto lg:basis-2/5">
                    <h1 className={clsx("text-5xl mb-5 text-center lg:text-left max-w-[90%]", containerText)}>{insightsData.maintitle}</h1>
                    <p className={clsx("text-center lg:text-left",containerText)}>{insightsData.subtitle}</p>
                </div>
                <div className="flex flex-col md:flex-row items-center text-left md:text-center justify-center gap-4 xl:gap-6 basis-auto lg:basis-3/5">
                    <div className="flex flex-col px-4">
                        <div className="flex justify-center items-center gap-2">
                            <NumberTicker
                                startValue={insightsData.title * 0.8}
                                value={insightsData.title}
                                className={clsx("whitespace-pre-wrap text-4xl font-semibold tracking-wider", containerText)}
                            />
                            <h2 className={clsx("text-4xl", containerText)}>+</h2>
                        </div>
                        <h5 className={clsx("mt-4 text-base text-center", containerText)}>
                            {insightsData.text}
                        </h5>
                    </div>
                    {/* <Separator orientation="horizontal" className={clsx("block md:hidden h-[0.8px] w-[60%] my-4 ", (background === "tertiary_color" || background === "transparent" || background === "gradient_bt" || background === "gradient_tb")
                        ? "bg-landing-primary"
                        : "bg-landing-tertiary")} />
                    <Separator orientation="vertical" className={clsx("hidden md:block w-[0.8px] h-28 bg-landing-primary", (background === "tertiary_color" || background === "transparent" || background === "gradient_bt" || background === "gradient_tb")
                        ? "bg-landing-primary"
                        : "bg-landing-tertiary")} /> */}
                    <div className="flex flex-col px-4">
                        <div className="flex justify-center items-center gap-2">
                            <NumberTicker
                                startValue={insightsData.title2 * 0.8}
                                value={insightsData.title2}
                                className={clsx("whitespace-pre-wrap text-4xl font-semibold tracking-wider", containerText)}
                            />
                            <h2 className={clsx("text-4xl", containerText)}>+</h2>
                        </div>
                        <h5 className={clsx("mt-4 text-base text-center", containerText)}>
                            {insightsData.text2}
                        </h5>
                    </div>
                    {/* <Separator orientation="horizontal" className={clsx("block md:hidden h-[1px] w-[60%] my-4", (background === "tertiary_color" || background === "transparent" || background === "gradient_bt" || background === "gradient_tb")
                        ? "bg-landing-primary"
                        : "bg-landing-tertiary")} />
                    <Separator orientation="vertical" className={clsx("hidden md:block w-[0.8px] h-28 bg-landing-primary", (background === "tertiary_color" || background === "transparent" || background === "gradient_bt" || background === "gradient_tb")
                        ? "bg-landing-primary"
                        : "bg-landing-tertiary")} /> */}
                    <div className="flex flex-col px-4">
                        <div className="flex justify-center items-center gap-2">
                            <NumberTicker
                                startValue={insightsData.title3 * 0.8}
                                value={insightsData.title3}
                                className={clsx("whitespace-pre-wrap text-4xl font-semibold tracking-wider", containerText)}
                            />
                            <h2 className="text-4xl">+</h2>
                        </div>
                        <h5 className={clsx("mt-4 text-base text-center", containerText)}>
                            {insightsData.text3}
                        </h5>
                    </div>
                </div>
            </div>
        </section>

    );
}