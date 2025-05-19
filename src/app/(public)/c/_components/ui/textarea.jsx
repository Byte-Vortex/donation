"use client"

import { cn } from "@/lib/utils"
import * as React from "react"


export const Textarea = React.forwardRef(({ label, disabled, placeholder, error, onChange, className, ...rest }, ref) => {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e)
        }
    }
    return (
        <div className="w-full relative">
            <label className="relative">
                {label && <div className="text-xs mb-1">{label}</div>}
                <textarea
                    ref={ref}
                    onChange={handleChange}
                    disabled={disabled}
                    className={cn("block rounded-lg px-3 text-sm min-h-[8rem] max-h-[12rem] placeholder:text-landing-foreground/60 py-2 bg-landing-background w-full appearance-none outline-none border-b-2 border-transparent focus:border-landing-primary duration-150 ring-offset-transparent", error && "!border-red-600/80 !ring-red-400", disabled && "opacity-50", className)}
                    placeholder={placeholder}
                    autoComplete="off"
                    {...rest}
                />
            </label>
            {error && <p className="absolute text-xs text-red-600">{error}</p>}

        </div>
    )
})

Textarea.displayName = "Textarea";