import { Controller } from "react-hook-form";
import { CountrySelector, usePhoneInput } from "react-international-phone";
import clsx from "clsx";
import 'react-international-phone/style.css';

export function ControlledPhoneInput({ control, name, label, hideDropdown = false }) {


    return (

        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                return (
                    <ReactPhoneInput field={field} fieldState={fieldState} label={label} hideDropdown={hideDropdown} />
                )
            }

            }
        />
    )
}

function ReactPhoneInput({ field, fieldState, label, hideDropdown }) {

    const { value, onChange } = field;
    const { error } = fieldState;

    const phoneInput = usePhoneInput({
        defaultCountry: 'in',
        value,
        forceDialCode: true,
        onChange: (data) => {
            onChange(data.phone);
        },
    });

    return (
        <label className="w-full relative">
            {label && <div className="text-xs mb-1">{label}</div>}
            <div className="flex gap-2 items-center">
                <CountrySelector
                    hideDropdown={hideDropdown}
                    selectedCountry={phoneInput.country}
                    onSelect={(country) => phoneInput.setCountry(country.iso2)}
                    className={clsx("max-w-max justify-center relative flex", error?.message ? "!border-red-600/80" : "!border-text/20")}
                    buttonClassName="!bg-landing-background rounded-lg !px-1 py-2 !h-10 !border-none"
                    dropdownStyleProps={{
                        className: "rounded-xl scrollbar-hide  left-0 flex outline-none !border-none !bg-landing-background transparent",
                        listItemClassName: "hover:!bg-landing-tertiary/70",
                        listItemFlagClassName: "w-4",
                        listItemCountryNameClassName: "text-sm",
                        listItemDialCodeClassName: "text-zinc-700 text-xs"
                    }}
                />

                <input
                    value={phoneInput.phone}
                    onChange={phoneInput.handlePhoneValueChange}
                    className={clsx("block rounded-lg h-10 px-3 text-sm placeholder:text-landing-foreground/60 py-2 bg-landing-background w-full appearance-none outline-none border-b-2 border-transparent focus:border-landing-primary duration-150 ring-offset-transparent", error?.message && "!border-red-600/80 !ring-red-400")}
                    placeholder="Phone Number"
                    autoComplete="off"
                />
            </div>
            <p className="text-xs text-red-600 absolute -bottom-4">{error?.message}</p>
        </label>
    );
};