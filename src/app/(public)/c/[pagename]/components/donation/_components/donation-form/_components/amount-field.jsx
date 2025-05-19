"use client";

import { useLandingPageDetails } from "@/app/(public)/[landing_page_id]/context/context";
import { useMemo, useEffect, useState, use } from "react";
import { useDonationFormStore } from "@/app/(public)/c/_store/donation-form.store";
import { useWatch, Controller } from "react-hook-form";
import clsx from "clsx"
import { ControlledInput } from "../../../../../../../[landing_page_id]/_components/misc/controlled/controlled-input";
import { cn } from "@/lib/utils";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../../../../[landing_page_id]/_components/misc/ui/select";
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


export function AmountField({ control, setValue, amountSuggestion }) {
    const { donationTypes } = useLandingPageDetails().data.sections.find(
        (section) => section.type === "card_section"
    )?.data || {};
    
    const types = useMemo(() => {
        let arr = [];
        for (let donationType of donationTypes) {
            let cards = donationType.cards;
            for (let card of cards) {
                let obj = { label: card.title, value: card.id }
                arr.push(obj);
            }
        }
        return arr;
    }, [donationTypes]);

    const selectedSeva = useDonationFormStore((state) => state.selectedSeva);

    useEffect(() => {
        if (!selectedSeva) return;
        setValue("seva_type", selectedSeva);
    }, [selectedSeva, setValue]);

    useEffect(() => {
        setTimeout(() => setValue("seva_type", types[0].value), 0);
    }, [setValue, types]);

    const sevaWatch = useWatch({
        control,
        name: "seva_type",
    });

    const amountWatch = useWatch({
        control,
        name: "amount"
    })
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [hasAmountFocus, setHasAmountFocus] = useState(false);

    useEffect(() => {
        if (!amountWatch || hasAmountFocus) return;
        if (amountWatch < 1100) setPopoverOpen(true);
    }, [amountWatch, setPopoverOpen, hasAmountFocus]);

    const [selectedAmount, setSelectedAmount] = useState(null);

    useEffect(() => {
        if (!selectedAmount) return;
        setValue("amount", selectedAmount, { shouldValidate: true });
    }, [selectedAmount, setValue]);

    return (
        <div className="w-full space-y-5">
            <div className="flex justify-between items-center flex-wrap gap-y-2">
                <div className="w-full sm:w-[49%]">
                    <Controller
                        name="seva_type"
                        control={control}
                        render={({
                            field: { value, onChange, ref },
                            fieldState: { error },
                        }) => {
                            return (
                                <div className="w-full relative">
                                    <div className="text-xs mb-1">Select Seva</div>
                                    <Select value={value} onValueChange={onChange} >
                                        <SelectTrigger
                                            className={cn(
                                                "bg-transparent min-h-12 py-2 border-2 focus:border-landing-primary rounded-md text-left items-start",
                                                error ? "border-red-600/80" : "border-landing-primary/30"
                                            )}
                                        >
                                            <SelectValue
                                                placeholder="Select Seva"
                                                className="whitespace-normal break-words text-sm text-left"
                                            />
                                        </SelectTrigger>

                                        <SelectContent className="bg-landing-background">
                                            {types.map((type, index) => (
                                                <SelectItem className="" key={index} value={String(type.value)}>
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {error && <p className="absolute -bottom-4 text-xs text-red-600">{error.message}</p>}
                                </div>
                            )
                        }}
                    />
                </div>

                <div className="w-full sm:w-[49%]">

                    <div className="text-xs mb-1">
                        <span> Amount</span>
                        <Popover onOpenChange={setPopoverOpen} open={popoverOpen} >
                            <PopoverTrigger className="ml-1 font-bold bg-landing-primary h-4 w-4 rounded-full inline-flex text-white items-center justify-center">
                                ?
                            </PopoverTrigger>
                            <PopoverContent side="top" className="w-72 text-sm bg-landing-foreground text-landing-background font-semibold rounded-xl border-none shadow-md py-2 text-justify">

                                <PopoverArrow className="fill-landing-foreground" />
                                <div>
                                    Donation Amount on 1,100 will receive Prasadam.
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <ControlledInput
                        name="amount"
                        placeholder="Custom Amount"
                        className="border-landing-primary/30 border-2 h-12"
                        control={control}
                        onFocus={() => setHasAmountFocus(true)}
                        onBlur={() => setHasAmountFocus(false)}
                    />

                </div>

            </div>

            {
                sevaWatch &&
                <div className="flex flex-wrap gap-2 w-full justify-between">
                    {
                        amountSuggestion?.map(amount => (
                            <button
                                key={amount}
                                type="button"
                                onClick={setSelectedAmount.bind(null, amount)}
                                className={clsx("flex-grow font-semibold text-sm border-landing-primary border rounded-[7px] p-1 text-center min-w-max max-w-[5rem]", amount === amountWatch ? "bg-landing-primary text-white" : "text-landing-primary")}
                            >
                                {amount}
                            </button>
                        ))
                    }
                </div >
            }

        </div>
    )
}