"use client"

import clsx from "clsx"
import { useForm } from "react-hook-form";
import { Input, TextArea } from "./form_fields/FormFields";
import PhoneInput from "./form_fields/PhoneInput";
import { Controller } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./form_fields/Select";
import { useMutation } from "@tanstack/react-query";
// import { URL } from "@/api/URLs";
import { toast } from "sonner";


export default function Form({ pageName }) {

    const { register, control, reset, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            patronType: pageName
        }
    });

    async function submitData(data) {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/donation/donationpatron/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.status >= 400) throw "error";
        return "success";

    }


    const mutation = useMutation({
        mutationFn: submitData,
        onSuccess: () => {
            toast.success("Form Submitted!")
            reset()
        },
        onError: () => toast.error("Something went wrong, please try again!")
    });

    return (
        <section id="form-section" className="w-full space-y-4 max-w-7xl mx-auto pt-12 pb-20 px-4">

            <form onSubmit={handleSubmit(mutation.mutate)}>
                <div className="rounded-xl bg-white p-4 md:p-12 space-y-8">

                    <div className="px-4 py-6 sm:px-6 bg-patron-background rounded-xl space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                            <Input
                                errors={errors}
                                placeholder="Donor's Name"
                                name="donor_name"
                                title="Donor's Name"
                                register={register}
                                validationSchema={{
                                    required: "Required!"
                                }}
                            />

                            <Input
                                errors={errors}
                                placeholder="Sevak Name"
                                name="sevak_name"
                                title="Name of Sevak  ( If different )"
                                register={register}
                                validationSchema={{
                                    required: "Required"
                                }}
                            />


                            <PhoneInput
                                control={control}
                                name={"phone"}
                                title={"Mobile Number"}
                            />




                            <Input
                                errors={errors}
                                placeholder="Your Email"
                                type="email"
                                name="email"
                                title="Email Id"
                                register={register}
                                validationSchema={{
                                    required: "Required!"
                                }}
                            />


                            <Controller
                                name="gender"
                                control={control}
                                rules={{
                                    validate: {
                                        required: (value) =>
                                            !!value || "Select Gender!",
                                    }
                                }}
                                render={({
                                    field: { value, onChange, ref },
                                    fieldState: { error },
                                }) => {
                                    return (
                                        <div className="relative">
                                            <label className="w-full">
                                                <div className="text-xs mb-1">Gender</div>
                                                <Select onValueChange={onChange} defaultValue={value}>
                                                    <SelectTrigger className={clsx("border-b-2 border-t-0 border-l-0 border-r-0 shadow-none rounded-lg h-10 focus:bg-white/60 focus:border-white", error ? "border-red-600/80" : "focus:border-patron-foreground border-transparent")}>
                                                        <SelectValue
                                                            placeholder="Select Gender"
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>

                                                        <SelectItem value={"male"}>
                                                            Male
                                                        </SelectItem>

                                                        <SelectItem value={"female"}>
                                                            Female
                                                        </SelectItem>

                                                        <SelectItem value={"other"}>
                                                            Other
                                                        </SelectItem>

                                                    </SelectContent>
                                                </Select>
                                            </label>
                                            {error && <p className="absolute -bottom-4 text-xs text-red-600">{error.message}</p>}
                                        </div>
                                    )
                                }}
                            />


                            <Input
                                errors={errors}
                                placeholder="Full Address"
                                name="full_address"
                                title="Full Address"
                                register={register}
                                validationSchema={{
                                    required: "Required!"
                                }}
                            />




                            <Input
                                errors={errors}
                                placeholder="Pincode"
                                name="pincode"
                                title="Pincode"
                                register={register}
                                validationSchema={{
                                    required: "Required!"
                                }}
                            />

                            <Input
                                errors={errors}
                                placeholder="PAN No."
                                name="pan"
                                title="PAN No."
                                register={register}
                                validationSchema={{
                                    required: "Required!"
                                }}
                            />

                            <Input
                                errors={errors}
                                placeholder="Occupation"
                                name="occupation"
                                title="Occupation"
                                register={register}
                                validationSchema={{
                                    required: "Required!"
                                }}
                            />

                            <Input
                                errors={errors}
                                placeholder="Name for Inscription"
                                name="name_inscription"
                                title="Name for Inscription"
                                register={register}
                                validationSchema={{
                                    required: "Required!"
                                }}
                            />

                            <div className="col-span-full">
                                <TextArea
                                    errors={errors}
                                    placeholder="Message"
                                    name="message"
                                    title="Message"
                                    register={register}
                                    validationSchema={{
                                        required: "Required!"
                                    }}
                                />
                            </div>


                        </div>

                        <div className="w-full sm:w-[48%] md:max-w-xs ml-auto">
                            <button disabled={mutation.isPending} type="submit" className="py-3 w-full rounded-full shadow-md bg-white text-foreground font-medium hover:scale-105 duration-150 active:scale-95 active:brightness-90">
                                <span className={clsx(mutation.isPending && "opacity-0 select-none")}>
                                    Submit
                                </span>
                                {
                                    mutation.isPending &&
                                    <div className="w-full h-full absolute z-[2] top-0 flex items-center justify-center">
                                        <div className="rounded-full w-6 h-6 border-2 border-t border-patron-background animate-spin"></div>
                                    </div>
                                }
                            </button>
                        </div>

                    </div>

                </div>
            </form>

        </section>
    )
}
