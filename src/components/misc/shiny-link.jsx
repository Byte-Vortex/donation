import "./shiny-link.css"
import { cn } from "@/lib/utils";

export function ShinyLink({children,className}) {
    return (
        <div className="flex rounded-xl p-[1px] overflow-hidden max-w-max">
            <a
                href="#form"
                className={cn("font-Normal text-base rounded-xl relative shadow-sm hover:brightness-110 active:scale-95 active:brightness-75 px-4 font-semibold shine-animation bg-landing-tertiary text-landing-primary duration-150",className)}>
               {children}
            </a>

</div>
    )
}