import { useRef } from "react";

import { cn } from "@/lib/utils";

export function Input({ register, validationSchema, placeholder, title, errors, name, type = "text", disabled = false, valueAsNumber = false, className = "", ...rest }) {



    const id = useRef(new Date() + Math.random());
    return (
        <div className="w-full relative">
            <label className="relative">
                {title && <div className="text-xs mb-1">{title}</div>}
                <input
                    id={id.current}
                    disabled={disabled}
                    type={type}
                    className={cn("block rounded-lg px-3 text-sm placeholder:text-foreground/60 py-2 bg-white text-foreground w-full appearance-none outline-none border-b-2 border-transparent duration-150 ring-offset-transparent focus:bg-white/60 focus:border-white", errors[name] && "!border-red-600/80 !ring-red-400", className)}
                    placeholder={placeholder}
                    autoComplete="off"
                    {...register(
                        name, {
                        ...validationSchema,
                        valueAsNumber
                    }
                    )}
                    {...rest}
                />
            </label>
            <p className="absolute -bottom-4 text-xs text-red-600">{errors?.[name]?.message}</p>

        </div>
    )
}


export function TextArea({ register, validationSchema, placeholder, title, errors, name, disabled = false, valueAsNumber = false, className = "", ...rest }) {

    return (
        <div className="w-full relative">
            <label className="relative">
                {title && <div className="text-xs mb-1">{title}</div>}
                <textarea
                    disabled={disabled}
                    className={cn("block rounded-lg px-3 text-sm placeholder:text-foreground/60 py-2 bg-white !text-foreground w-full appearance-none outline-none border-b-2 border-transparent duration-150 ring-offset-transparent min-h-[6rem] max-h-[10rem] focus:bg-white/60 focus:border-white", errors[name] && "!border-red-600/80 !ring-red-400", className)}
                    placeholder={placeholder}
                    autoComplete="off"
                    {...register(
                        name, {
                        ...validationSchema,
                        valueAsNumber
                    }
                    )}
                    {...rest}
                />
            </label>
            <p className="absolute -bottom-4 text-xs text-red-600">{errors?.[name]?.message}</p>

        </div>
    )
}






