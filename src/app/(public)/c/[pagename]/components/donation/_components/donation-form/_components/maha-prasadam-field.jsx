"use client";

import { ControlledCheckbox } from "@/app/(public)/c/_components/controlled/controlled-checkbox";
import { ControlledInput } from "@/app/(public)/c/_components/controlled/controlled-input";
import { useWatch } from "react-hook-form";

export function MahaPrasadamField({ control, parent}) {
    const fieldWatch = useWatch({
        control,
        name: "recieve_mahaprasadam",
    });

    const amount = useWatch({
        control,
        name: "amount",
    });
    const showMahaprasadamOptions = amount >= 1100 || parent=="c"
    
    return (
        showMahaprasadamOptions && 
        (
            <div className="w-full grid sm:grid-cols-2 gap-4">
                <label className="flex items-center gap-2 col-span-full text-sm">
                    <ControlledCheckbox control={control} name={"recieve_mahaprasadam"} />
                    <div>I would like to recieve Maha Prasadam (Only within India)</div>
                </label>

                {fieldWatch && (
                    <>
                    <ControlledInput
                        shouldUnregister
                        control={control}
                        name={"building_number"}
                        placeholder={"House / Apartment / Building Number"}
                        label={"House / Apartment / Building Number"}
                    />

                    <ControlledInput
                        shouldUnregister
                        control={control}
                        name={"street"}
                        placeholder={"Street/Area"}
                        label={"Street/Area"}
                    />
                    </>
                )}
            </div>
        )
    );
}