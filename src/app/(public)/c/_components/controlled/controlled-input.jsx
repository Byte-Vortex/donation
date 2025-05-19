import * as React from "react"
import { Input } from "../ui/input";
import { Controller } from "react-hook-form"



const ControlledInput = ({ control, name, ...props }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { name, onChange, value, ref }, fieldState: { error } }) => {

                return (
                    <Input
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

ControlledInput.displayName = "ControlledInput"

export { ControlledInput }
