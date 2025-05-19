"use client"

import { ControlledInput } from "@/app/(public)/c/_components/controlled/controlled-input";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Input } from "@/app/(public)/c/_components/ui/input";
import { useWatch } from "react-hook-form";

export function CampaignAmountField({ control, setValue }) {

    let sqftWatch = parseFloat(useWatch({
        control,
        name: "sqft"
    }));


    const [selectedSqft, setSelectedSqft] = useState(null);

    useEffect(() => {
        selectedSqft && setValue("sqft", selectedSqft);
    }, [selectedSqft, setValue]);

    const sqfts = [51, 21, 11, 5, 3, 1];

    let amount = sqftWatch * 1800;
    amount = (!amount || amount <= 0) ? "" : amount;
    return (

        <div className="w-full space-y-4">
            <div className="w-full flex justify-between items-center flex-wrap gap-y-4">

                <div 
                    className="w-full sm:w-[49%]" 
                    onCopy={(e) => e.preventDefault()} 
                    onCut={(e) => e.preventDefault()} 
                    onPaste={(e) => e.preventDefault()}
                >
                    <ControlledInput
                        name="sqft"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        placeholder="Number of Square Feet"
                        label="Number of Square Feet"
                        className="border-landing-primary/60 border-2 h-12"
                        control={control}

                    />
                </div>

                <div className="w-full sm:w-[49%]">
                    <Input
                        name="amount"
                        disabled
                        placeholder="Amount"
                        label="Amount"
                        className="border-landing-primary/60 border-2 h-12 disabled:opacity-100 font-bold"
                        onChange={null}
                        value={new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
                            amount,
                        )}
                    />

                </div>

            </div>

            {
                <div className="flex flex-wrap gap-2 w-full justify-between">
                    {
                        sqfts.map(sqft => (
                            <button
                                key={sqft}
                                type="button"
                                onClick={setSelectedSqft.bind(null, sqft)}
                                className={clsx("flex-grow font-semibold text-sm border-landing-primary border rounded-[7px] p-1 text-center min-w-max max-w-[5rem]", sqft === sqftWatch ? "bg-landing-primary text-white" : "text-landing-primary")}
                            >
                                {sqft}
                            </button>
                        ))
                    }
                </div >

            }
        </div>
    )

    return null;
}