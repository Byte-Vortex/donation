"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { FaCheck } from "react-icons/fa6";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
    <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
            "peer h-4 w-4 shrink-0 rounded-sm bg-landing-background border border-landing-primary/50 data-[state=checked]:bg-landing-primary data-[state=checked]:text-landing-background focus-visible:outline-none focus-visible:ring focus-visible:ring-landing-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
        )}
        {...props}>
        <CheckboxPrimitive.Indicator
            className={cn("relative flex items-center justify-center text-on-primary")}>
            <FaCheck className="absolute h-3.5 w-3.5" />
        </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
