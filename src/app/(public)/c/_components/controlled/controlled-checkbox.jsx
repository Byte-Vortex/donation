import { Controller } from "react-hook-form"
import { Checkbox } from "../ui/checkbox"

export const ControlledCheckbox = ({ name, control, ...props }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange, ref } }) => (
                <Checkbox
                    checked={!!value}
                    ref={ref}
                    onCheckedChange={onChange}
                    {...props}
                />
            )}
        />
    )
}
