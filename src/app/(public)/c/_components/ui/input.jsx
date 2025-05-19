import { cn } from "@/lib/utils"
import * as React from "react"


export const Input = React.forwardRef(({ label, disabled, placeholder, error, onChange, type, className, ...rest }, ref) => {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e)
        }
    }
    return (
        <div className="w-full relative">
            <label className="relative">
                {label && <div className="text-xs mb-1">{label}</div>}
                <input
                    ref={ref}
                    onChange={handleChange}
                    disabled={disabled}
                    type={type}
                    className={cn("block rounded-lg px-3 text-sm h-10 placeholder:text-landing-foreground/60 py-2 bg-landing-background w-full appearance-none outline-none border-b-2 border-transparent focus:border-landing-primary duration-150 ring-offset-transparent", error && "!border-red-600/80 !ring-red-400 disabled:opacity-50", className)}
                    placeholder={placeholder}
                    autoComplete="off"
                    {...rest}
                />
            </label>
            {error && <p className="absolute text-xs text-red-600">{error}</p>}

        </div>
    )
})

Input.displayName = "Input";