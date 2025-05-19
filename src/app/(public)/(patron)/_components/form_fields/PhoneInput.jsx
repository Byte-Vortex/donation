import { Controller } from "react-hook-form";
import { useRef } from "react";
import { CountrySelector, usePhoneInput } from "react-international-phone";
import clsx from "clsx";
import 'react-international-phone/style.css';

const invalid_phone_numbers = [
    '0000000000', '1111111111', '2222222222', '3333333333', '4444444444',
    '5555555555', '6666666666', '7777777777', '8888888888', '9999999999',
    '1000000000', '2000000000', '3000000000', '4000000000', '5000000000',
    '6000000000', '7000000000', '8000000000', '9000000000', '0000000001',
    '0000000002', '0000000003', '0000000004', '0000000005', '0000000006',
    '0000000007', '0000000008', '0000000009', '9012345678', '0123456789',
    '1234567890', '2345678901', '3456789012', '4567890123', '5678901234',
    '6789012345', '7890123456', '8901234567', '9876543210', '8765432109',
    '7654321098', '6543210987', '1122334455', '9870123456', '6549873210',
    '3141592653', '5551212121', '1231231234', '9990001111', '4567890123',
    '5554443333', '3210987654', '1111222233', '5556667777', '9998887777',
    '1111000011', '7778889990'
];

export default function PhoneInput({ control, name, title }) {


    function validatePhoneNumber(value) {
        const enteredNumber = value.substring(String(value).indexOf(" ") + 1);

        let number = "";
        for (let digit of enteredNumber) {
            if ('0' <= digit && digit <= '9') number += digit;
        }
        if (number.length < 10) return "Enter a valid phone number."


        if (invalid_phone_numbers.includes(number)) return "Enter valid phone number."

        return true;
    }

    return (

        <Controller
            name={name}
            rules={{
                validate: validatePhoneNumber,
            }}
            control={control}
            render={({ field, fieldState }) => {
                return (
                    <ReactPhoneInput field={field} fieldState={fieldState} title={title} />
                )
            }

            }
        />
    )
}

function ReactPhoneInput({ field, fieldState, title }) {

    const { value, onChange, onBlur, ref } = field;
    const { error } = fieldState;

    const id = useRef(new Date() + Math.random());

    const phoneInput = usePhoneInput({
        defaultCountry: 'in',
        value,
        forceDialCode: true,
        onChange: (data) => {
            onChange(data.phone);
        },
    });

    return (
        <div className="w-full relative">
            <div className="text-xs mb-1">{title}</div>
            <div className="flex gap-2 items-center">
                <CountrySelector
                    selectedCountry={phoneInput.country}
                    onSelect={(country) => phoneInput.setCountry(country.iso2)}
                    className={clsx("max-w-max justify-center relative flex items-center", error?.message ? "!border-red-600/80" : "!border-text/20")}
                    buttonClassName="!bg-white rounded-lg px-1 py-2 !border-none"
                    dropdownStyleProps={{
                        className: "rounded-xl !scrollbar-hide  left-0 flex outline-none !border-none !bg-landing-background transparent",
                        listItemClassName: "hover:!bg-patron-background/20",
                        listItemFlagClassName: "w-4",
                        listItemCountryNameClassName: "text-sm",
                        listItemDialCodeClassName: "text-zinc-700 text-xs"
                    }}
                />

                <input
                    id={id.current}
                    value={phoneInput.phone}
                    onChange={phoneInput.handlePhoneValueChange}
                    className={clsx("block rounded-lg px-3 text-sm placeholder:text-landing-foreground/60 py-2 bg-white focus:bg-white/60 focus:border-white !text-foreground w-full appearance-none outline-none border-b-2 border-transparent duration-150 ring-offset-transparent", error?.message && "!border-red-600/80 !ring-red-400")}
                    placeholder="Phone Number"
                    autoComplete="off"
                />
            </div>
            <p className="text-xs text-red-600 absolute -bottom-4">{error?.message}</p>
        </div>
    );
};