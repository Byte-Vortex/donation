"use client";

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { Controller } from "react-hook-form";
import { BsWhatsapp as WhatsappIcon, BsEnvelope as EmailIcon } from "react-icons/bs";
import { cn, isValidPhoneNumber } from "@/lib/utils";
import { getLastSlug } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { ControlledInput } from "@/app/(public)/c/_components/controlled/controlled-input";
import { ControlledPhoneInput } from "@/app/(public)/c/_components/controlled/controlled-phone-input";
import { ControlledDatePicker } from "@/app/(public)/c/_components/controlled/controlled-date-picker";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/(public)/c/_components/ui/select";

import { yupResolver } from "@hookform/resolvers/yup"
import yup from "@/lib/yup";
import { useCampaignFormMutation } from "@/app/(public)/c/_hooks/use-campaign-form-mutation";
import Spinner from "@/components/ui/spinner";
import { CampaignAmountField } from "./campaign-amount-field";
import { AmountField } from "./amount-field";
import { toast } from "sonner";

function getRequiredAmountFields(parent, data) {
    if (parent == "c") {
        return {
            sqft: yup.number().integer().moreThan(0).required(),
        }
    } else {
        return {
            amount: yup.number().min(data.minAmount).required(),
            seva_type: yup.string().required(),
        }
    }
}

export function ForeignForm({ basicDetails, parent, data }) {
    const [isDisabled, setIsDisabled] = useState(false);

    const schema = useMemo(() => (
        yup.object({

            pagename: yup.string().notRequired(),
            type: yup.string().notRequired(),
            donation_type: yup.string().notRequired(),

            indian_passport: yup.string().trim().required(),
            name: yup.string().trim().required(),
            phone: yup.string().trim().required().test('is-valid-phone-number', "Must be a valid Number!", isValidPhoneNumber),
            email: yup.string().trim().required().email(),
            ...getRequiredAmountFields(parent, data),

            address: yup.string().when('indian_passport', {
                is: "yes",
                then: (schema) => schema.trim().required(),
            }),
            pincode: yup.string().when('indian_passport', {
                is: "yes",
                then: (schema) => schema.trim().required().length(6),
            }),

            house_number: yup.string().when('indian_passport', {
                is: "no",
                then: (schema) => schema.trim().required(),
            }),

            street: yup.string().when('indian_passport', {
                is: "no",
                then: (schema) => schema.trim().required(),
            }),
            city: yup.string().when('indian_passport', {
                is: "no",
                then: (schema) => schema.trim().required(),
            }),
            state: yup.string().when('indian_passport', {
                is: "no",
                then: (schema) => schema.trim().required(),
            }),

            country: yup.string().when('indian_passport', {
                is: "no",
                then: (schema) => schema.trim().required(),
            }),
        })
    ), [data]);

    let searchParams = useSearchParams();

    let paramsObj = {};
    searchParams.forEach((value, key) => {
        paramsObj[key] = value;
    })

    if (parent == "c") {
        paramsObj.sqft = 3;
    }

    const { control, setValue, getValues, handleSubmit } = useForm({
        defaultValues: {
            ...paramsObj,
            type: "foreigner",
            donation_type: "once",
        },
        resolver: yupResolver(schema),
    });

    const mutation = useCampaignFormMutation("foreign", parent);

    function onSubmit(data) {
        setIsDisabled(true);
        setTimeout(() => setIsDisabled(false), 3000);
        data.pagename = getLastSlug();
        mutation.mutate(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, () => toast.error("Please fix form errors!"))}>
            <div className="rounded-xl bg-landing-background md:p-6 p-4  space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-4">
                        <div className="w-full max-w-2xl">
                            {parent == "c" ?
                                <CampaignAmountField
                                    control={control}
                                    getValues={getValues}
                                    setValue={setValue}
                                /> :
                                <AmountField
                                    amountSuggestion={data.amountSuggestion}//newly added
                                    control={control}
                                    getValues={getValues}
                                    setValue={setValue}
                                />
                            }
                        </div>

                        <PersonalDetailsFields mutation={mutation} control={control} setValue={setValue} isDisabled={isDisabled} />
                    </div>
                    <div>
                        <div className="bg-landing-tertiary px-4 py-4 sm:px-6 rounded-xl flex flex-col justify-between gap-4">
                            <p className="text-sm font-bold">
                                *By proceeding, you are agreeing to our &nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://guptvrindavandham.org/terms-and-conditions/"
                                    className="text-landing-primary font-bold hover:underline"
                                >
                                    Terms & Conditions
                                </a>
                                &nbsp; & &nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://guptvrindavandham.org/privacy-policy/"
                                    className="text-landing-primary font-bold hover:underline"
                                >
                                    Privacy Policy
                                </a>
                            </p>
                            <div className="space-y-2 max-w-2xl text-sm">
                                <p className="font-bold">*Under the Foreign Contribution (Regulation) Act, 2010, Registered under Section 11 (1) :<br /> Registration Number: <span className="text-landing-primary">125560332</span></p>
                            </div>
                            <div className="sm:min-w-max">

                                <h5 className="text-landing-secondary">Support</h5>
                                <div className="xl:flex items-center mt-2 text-sm gap-4">
                                    <div className="">For more information please contact :</div>
                                    <div className="flex flex-col lg:flex-row gap-4 mt-3 xl:mt-0 ">
                                        <a target="_blank" rel="noopener" href={"https://wa.me/" + basicDetails.whatsapp_number} className="flex items-center gap-2 hover:underline font-medium">
                                            <div className="p-1.5 rounded-xl bg-landing-background inline-flex items-center justify-center text-landing-primary">
                                                <WhatsappIcon />
                                            </div>
                                            {basicDetails.whatsapp_number}
                                        </a>
                                        <a target="_blank" rel="noopener" href={"mailto:" + "dmt@hkmjaipur.org"} className="flex items-center gap-2 hover:underline font-medium">
                                            <div className="p-1.5 rounded-xl bg-landing-background inline-flex items-center justify-center text-landing-primary">
                                                <EmailIcon />
                                            </div>
                                            {"dmt@hkmjaipur.org"}
                                        </a>
                                    </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    )
}

function PersonalDetailsFields({ control, mutation, isDisabled }) {

    return (
        <div className="bg-landing-tertiary text-on-surface p-4 md:p-6 rounded-xl">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black w-full">

                {/* Passport Select */}
                <Controller
                    name="indian_passport"
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <div className="w-full relative">
                            <label className="w-full">
                                <div className="text-xs mb-1">I am</div>
                                <Select onValueChange={onChange} defaultValue={value}>
                                    <SelectTrigger
                                        className={cn(
                                            "bg-landing-background border-b-2 border-t-0 border-l-0 border-r-0 border-transparent shadow-none rounded-lg h-10",
                                            error ? "border-red-600/80" : "focus:border-landing-primary"
                                        )}
                                    >
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-landing-background">
                                        <SelectItem value="yes">Indian Passport Holder</SelectItem>
                                        <SelectItem value="no">Non-Indian Passport Holder</SelectItem>
                                    </SelectContent>
                                </Select>
                            </label>
                            {error && (
                                <p className="absolute -bottom-4 text-xs text-red-600">
                                    {error.message}
                                </p>
                            )}
                        </div>
                    )}
                />

                {/* Notice Message */}
                <div className="md:col-span-2 text-sm max-w-3xl mt-[-8px]">
                    <p className="text-zinc-700">
                        *For donating in foreign currency, to comply with government regulations you need to identify yourself.
                    </p>
                </div>

                {/* Name */}
                <ControlledInput
                    placeholder="Your Full Name"
                    name="name"
                    label="Full Name"
                    control={control}
                />

                {/* Phone */}
                <ControlledPhoneInput
                    control={control}
                    name="phone"
                    label="WhatsApp Number"
                />

                {/* Email */}
                <ControlledInput
                    placeholder="Your Email"
                    name="email"
                    label="Email"
                    control={control}
                />

                {/* DOB + Note */}
                <div className="flex flex-col">
                    <ControlledDatePicker
                        maxDate={(() => {
                            const date = new Date();
                            date.setFullYear(date.getFullYear() - 10);
                            return date;
                        })()}
                        control={control}
                        name="dob"
                        label="Date of Birth (Optional)"
                    />
                    <p className="font-semibold text-xs mt-1">
                        Sankalp and Aarti will be performed for you on your birthday.
                    </p>
                </div>

                {/* Address Fields */}
                <AddressFields control={control} />
            </div>


            <div className="w-full flex justify-end items-center flex-wrap gap-4 pt-4">
                <div className="w-full flex justify-end items-center ml-auto">
                    <Button
                        type="submit"
                        disabled={mutation.isPending || isDisabled}
                        className="flex items-center justify-center py-3 h-12 min-w-[180px] rounded-xl shadow-md bg-landing-primary text-white font-medium hover:scale-105 duration-150 active:scale-95 active:brightness-90"
                    >
                        {mutation.isPending ? <Spinner className="border-current" /> : "Donate"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

function AddressFields({ control }) {

    const indian_passport = useWatch({
        control,
        name: "indian_passport"
    })

    return (
        indian_passport === "yes" ?
            <>
                <div>
                    <ControlledInput
                        placeholder="Full Address"
                        name="address"
                        label="Full Address ( *Indian Residential Address )"
                        control={control}
                    />
                    <span className="text-xs font-semibold"> </span>
                </div>

                <ControlledInput
                    placeholder="Pincode"
                    name="pincode"
                    label="Pincode"
                    control={control}
                />
            </>
            :
            indian_passport === "no" ? <>

                <ControlledInput
                    placeholder="House No./Building No."
                    name="house_number"
                    label="House No./Building No."
                    control={control}
                />

                <ControlledInput
                    placeholder="Street"
                    name="street"
                    label="Street"
                    control={control}
                />

                <ControlledInput
                    placeholder="City"
                    name="city"
                    label="City"
                    control={control}
                />

                <ControlledInput
                    placeholder="State"
                    name="state"
                    label="State"
                    control={control}
                />

                <ControlledInput
                    placeholder="Country"
                    name="country"
                    label="Country"
                    control={control}
                />

            </> : null
    )
}
