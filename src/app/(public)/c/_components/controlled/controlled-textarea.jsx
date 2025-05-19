import * as React from "react"
import { Textarea } from "../ui/textarea"
import { Controller } from "react-hook-form"



const ControlledTextarea = ({ control, name, ...props }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { name, onChange, value, ref }, fieldState: { error } }) => {

                return (
                    <Textarea
                        error={error?.message}
                        ref={ref}
                        name={name}
                        value={value ?? ""}
                        onChange={onChange}
                        {...props}
                    />
                )
            }}
        />
    )
}

ControlledTextarea.displayName = "ControlledTextarea"

export { ControlledTextarea }
