"use client";

import { useForm, useWatch } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useMemo, useState, useEffect } from "react";
import { BsWhatsapp as WhatsappIcon, BsEnvelope as EmailIcon } from "react-icons/bs";
import { Image } from "@/components/image";
import { cn, isValidPhoneNumber } from "@/lib/utils";
import CopyToClipboard from "@/components/ui/copy-to-clipboard";
import { getLastSlug } from "@/lib/utils";
import { useParams, useSearchParams } from "next/navigation";
import { ControlledInput } from "@/app/(public)/c/_components/controlled/controlled-input";
import { ControlledCheckbox } from "@/app/(public)/c/_components/controlled/controlled-checkbox";
import { ControlledPhoneInput } from "@/app/(public)/c/_components/controlled/controlled-phone-input";
import { ControlledDatePicker } from "@/app/(public)/c/_components/controlled/controlled-date-picker";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/(public)/c/_components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverArrow
} from "@/components/ui/popover"
import { MdInfoOutline as InfoIcon } from "react-icons/md";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineUpdate } from "react-icons/md";
import SupportedPaymentLogos from "@/assets/images/supported-payments.png"
import { yupResolver } from "@hookform/resolvers/yup"
import yup from "@/lib/yup";
import { useCampaignFormMutation } from "@/app/(public)/c/_hooks/use-campaign-form-mutation";
import { toast } from "sonner";
import Spinner from "@/components/ui/spinner";
import { CampaignAmountField } from "./campaign-amount-field";
import { AmountField } from "./amount-field";
import { MahaPrasadamField } from "./maha-prasadam-field";
import { SyncForm } from "@/components/misc/_store/sync-form";
import { useLandingPageDetails } from "@/app/(public)/[landing_page_id]/context/context";
import { useCampaignPageDetails } from "@/app/(public)/c/_context/campaign-context";
import { usePathname } from "next/navigation";
import { usePincodeLookup } from "@/app/(public)/c/_hooks/usePincodeLookup"
import * as Tooltip from '@radix-ui/react-tooltip';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function getRequiredAmountFields(parent, data) {
    if (parent == "c") {
        return {
            sqft: yup.number().integer().moreThan(0).required(),
        }
    } else {
        return {
            amount: yup.number().min(data.minAmount, "Amount must be ${min}!").required(),
            seva_type: yup.string().required(),
        }
    }
}

export function IndianForm({ pageType, basicDetails, parent, data }) {
    const pathname = usePathname();
    const [isDisabled, setIsDisabled] = useState(false);
    const { landing_page_id } = useParams();

    if (parent == "c") {
        data = {
            minAmount: 108
        }
    }

    const schema = useMemo(
        () =>
            yup.object({
                //form related info
                pagename: yup.string().notRequired(),
                //foreign or indian
                type: yup.string().notRequired(),
                //once or monthly
                donation_type: yup.string().notRequired(),
                ...getRequiredAmountFields(parent, data),
                //personal info
                name: yup.string().trim().required(),
                gotra: yup.string().trim().optional().nullable(),
                phone: yup.string().trim().required().test('is-valid-phone-number', "Enter a valid Number!", isValidPhoneNumber),
                email: yup.string().trim().required().email("Enter a valid email!"),
                dob: yup.string().nullable().optional(),
                pincode: yup.string().trim().required().length(6, "Must of length 6"),
                district: yup.string(),
                state: yup.string(),
                //tax
                tax_benefits: yup.boolean(),
                pan_number: yup.string().trim().notRequired().test({
                    name: "valid-pan",
                    message: "Invalid Pan No. Format!",
                    test: (val) => {
                        if (val === null || val === undefined || val === "") return true;

                        const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
                        return regex.test(val);

                    }
                }),
                //patronship
                patronship_upgrade: yup.boolean(),
                patronship_type: yup.string().when('patronship_upgrade', {
                    is: true,
                    then: (schema) => schema.required(),
                }),


                //prasad info
                recieve_mahaprasadam: yup.boolean(),
                building_number: yup.string().when('recieve_mahaprasadam', {
                    is: true,
                    then: (schema) => schema.required(),
                }),
                street: yup.string().when('recieve_mahaprasadam', {
                    is: true,
                    then: (schema) => schema.required(),
                }),
                add_pg_fee: yup.boolean().default(false)
            },
                [data.minAmount]
            ));

    let searchParams = useSearchParams();

    let paramsObj = {};
    searchParams.forEach((value, key) => {
        paramsObj[key] = value;
    })

    if (parent == "c") {
        paramsObj.sqft = 3;

    } else {
        paramsObj.seva_type = null;
        paramsObj.pagename = getLastSlug();
    }

    const campaignDetails = useCampaignPageDetails()?.data?.donationDetails;
    const landingDetails = useLandingPageDetails()?.data?.bankdetails;
    const upiDetails = pathname?.startsWith('/c')
        ? campaignDetails
        : landingDetails || basicDetails.bankDetails;

    const bankDetails = basicDetails.bankDetails;
    const upiId = upiDetails?.upi_id || basicDetails.bankDetails?.upi_id;
    const qrCode = upiDetails?.qr_code || basicDetails.bankDetails?.qr_code;
    const qrCodeSrc = qrCode?.startsWith('https')
        ? qrCode
        : `${BASE_URL}${qrCode}`;

    const { control, setValue, getValues, handleSubmit } = useForm({
        defaultValues: {
            ...paramsObj,
            tax_benefits: false,
            type: "indian",
            donation_type: "once",
            recieve_mahaprasadam: false,
        },
        resolver: yupResolver(schema),
    });


    const mutation = useCampaignFormMutation("indian", parent);

    function onSubmit(data) {
        console.log("Form Data: ", data);
        setIsDisabled(true);
        setTimeout(() => setIsDisabled(false), 3000);
        data.pagename = getLastSlug();
       
        if (parent != "c") {
            if (data.add_pg_fee)
                data.amount = data.amount + parseInt(data.amount / 49);
        }
        mutation.mutate(data);
    }

    return (

        <form onSubmit={handleSubmit(onSubmit, () => toast.error("Please fix form errors!"))}>
            <div className="rounded-xl bg-landing-background md:p-6 p-4 space-y-6">


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-4">
                        <div className="w-full max-w-2xl">
                            {/* Add condition to render square feet or normal amount field */}
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
                                />}
                        </div>
                        <BasicDetailsSection
                            mutation={mutation}
                            pageType={pageType}
                            control={control}
                            parent={parent}
                            isDisabled={isDisabled}
                            setValue={setValue}
                        />

                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="bg-landing-tertiary text-black px-4 py-4 sm:px-6 rounded-xl flex flex-col gap-4">
                            <div className="lg:flex justify-between gap-4">
                                <div>
                                    <h5 className="text-landing-secondary flex items-center  justify-center gap-2 max-w-max">For UPI & QR</h5>
                                    <div className="flex-col justify-center items-center pt-4 pb-2">
                                        <div className="max-w-48 mx-auto flex items-center justify-center overflow-hidden bg-landing-primary rounded-xl p-1 aspect-1 mb-2">
                                            <div className="rounded-lg bg-white p-1 relative w-full h-full">
                                                <Image fill src={qrCodeSrc} priority />
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 justify-center mt-1">
                                            <p className="font-bold text-sm text-center">
                                                {upiId}
                                            </p>
                                            <CopyToClipboard
                                                text={upiId}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-landing-secondary flex items-center  justify-center gap-2 max-w-max">
                                        <span> For Bank Transfer </span>
                                        <CopyToClipboard
                                            text={
                                                "Account Name: " + bankDetails.account_Name + "\n" +
                                                "Account Number: " + bankDetails.account_number + "\n" +
                                                "Bank Name: " + bankDetails.bank_Name + "\n" +
                                                "IFSC Code: " + bankDetails.ifsc_code + "\n"
                                            }
                                        />
                                    </h5>

                                    <div className="flex flex-col gap-y-1 text-sm pt-4">
                                        <div>
                                            <span className="text-zinc-800 ">Account Name:</span>&nbsp;
                                            <span className="text-landing-primary font-bold inline-flex items-center gap-2">
                                                <span> {bankDetails.account_Name}</span>
                                                <CopyToClipboard text={bankDetails.account_Name} />
                                            </span>
                                        </div>

                                        <div>
                                            <span className="text-zinc-800 text-sm">Account Number:</span>&nbsp;
                                            <span className="text-landing-primary font-bold inline-flex items-center gap-2">
                                                <span>{bankDetails.account_number}</span>
                                                <CopyToClipboard text={bankDetails.account_number} />
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-zinc-800 text-sm">Bank Name:</span>&nbsp;
                                            <span className="text-landing-primary font-bold inline-flex items-center gap-2">
                                                <span>{bankDetails.bank_Name}</span>
                                                <CopyToClipboard text={bankDetails.bank_Name} />
                                            </span>
                                        </div>

                                        <div>
                                            <span className="text-zinc-800 text-sm">IFSC Code:</span>&nbsp;
                                            <span className="text-landing-primary font-bold inline-flex items-center gap-2">
                                                <span>{bankDetails.ifsc_code}</span>
                                                <CopyToClipboard text={bankDetails.ifsc_code} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-center text-xs font-semibold text-landing-primary">(Kindly send us a screenshot for your seva entry)</p>

                            <div className="flex flex-col gap-1 py-2">
                                {(pageType === "charitable" || pageType === "all") &&
                                    <p className="text-sm font-semibold">
                                        *80G available as per Income Tax Act 1961 and rules made there under.<br />Tax Exemption Certificate Ref. No.:&nbsp;&nbsp;{basicDetails.bankDetails.tax_exemption_number}
                                    </p>
                                }

                                <p className="text-sm font-semibold">
                                    *By proceeding , you are agreeing to our &nbsp;
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

                            </div>

                            <div className="-mt-2">
                                <h5 className="text-landing-secondary">Support</h5>
                                <div className="lg:flex items-center mt-2 text-sm gap-4">
                                    <div className="">For more information please contact:</div>
                                    <div className="flex flex-col md:flex-row justify-between gap-2">
                                        <a target="_blank" rel="noopener" href={"https://wa.me/" + basicDetails.whatsapp_number} className="flex items-center gap-2 hover:underline font-medium">
                                            <div className="p-1 rounded-xl bg-landing-background inline-flex items-center justify-center text-landing-primary">
                                                <WhatsappIcon />
                                            </div>
                                            {basicDetails.whatsapp_number}
                                        </a>
                                        {/* To-DO: Update contact email with donation email (dmt@hkmjaipur.org) */}
                                        <a target="_blank" rel="noopener" href={"mailto:" + "dmt@hkmjaipur.org"} className="flex items-center gap-2 hover:underline font-medium">
                                            <div className="p-1 rounded-xl bg-landing-background inline-flex items-center justify-center text-landing-primary">
                                                <EmailIcon />
                                            </div>
                                            {"dmt@hkmjaipur.org"}
                                        </a>
                                    </div>

                                </div>

                                <div className="flex items-center gap-3 my-3 ">
                                    <div className="flex items-center gap-3">
                                        {(pageType === "charitable" || pageType === "all") && <Popover>
                                            <PopoverTrigger className="cursor-pointer bg-gradient-to-r from-green-500 bg-green-700 rounded-xl px-4 py-2 text-white font-semibold text-sm hover:underline hover:brightness-110 duration-150 flex gap-1 items-center">
                                                <span> Tax Benefits </span>
                                                <InfoIcon className="text-base" />
                                            </PopoverTrigger>
                                            <PopoverContent className="bg-green-500 text-white font-semibold rounded-xl border-none elevation-2 py-2 px-8">
                                                <div>
                                                    80G Tax Benefits Available For INR donations
                                                </div>
                                                <PopoverArrow className="fill-green-500" />
                                            </PopoverContent>
                                        </Popover>
                                        }
                                        <Popover>
                                            <PopoverTrigger className="cursor-pointer bg-gradient-to-r from-orange-500 bg-orange-400 rounded-xl px-4 py-2 text-white font-semibold text-sm hover:underline hover:brightness-110 duration-150 flex gap-1 items-center">
                                                <span>Assured</span>
                                                <InfoIcon className="text-base" />
                                            </PopoverTrigger>
                                            <PopoverContent className="bg-gradient-to-r from-black to-neutral-900 text-white border-none elevation-2 rounded-xl">
                                                <div className="space-y-4">
                                                    <div className="flex gap-2 items-center">
                                                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white text-black">
                                                            <MdOutlineUpdate className="text-lg" />
                                                        </div>
                                                        <div className="-space-y-1.5">
                                                            <div className="font-medium text-base">Campaign Updates</div>
                                                            <div className="text-sm">100% Donation Updates Guaranteed</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 items-center">
                                                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white text-black">
                                                            <MdOutlineVerifiedUser className="text-lg" />
                                                        </div>
                                                        <div className="-space-y-1.5">
                                                            <div className="font-medium text-base">Verified NGO&apos;s</div>
                                                            <div className="text-sm">Charities Vetted With Due Diligence</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 items-center">
                                                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white text-black">
                                                            <MdOutlinePhone className="text-lg" />
                                                        </div>
                                                        <div className="-space-y-1.5">
                                                            <div className="font-medium text-base">Campaigner Connect</div>
                                                            <div className="text-sm">Provision To Connect Directly With Campaigner</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <PopoverArrow className="fill-on-surface" />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className=" hidden lg:flex w-60 ">
                                        <Image src={SupportedPaymentLogos} className="w-full h-5" />
                                    </div>
                                </div>
                                <div className="lg:hidden flex w-3/4 py-2">
                                    <Image src={SupportedPaymentLogos} className="w-full h-auto" />
                                </div>


                            </div>
                        </div>
                    </div>

                </div>


            </div>
            <SyncForm
                control={control}
                formKey={parent == "c" ? "campaign" : "landing-indian-" + landing_page_id}
                setValue={setValue}
                getValues={getValues}
            />
        </form>
    )
}

function BasicDetailsSection({ mutation, control, pageType, parent, isDisabled, setValue }) {
    const { landing_page_id } = useParams();
    const pincode = useWatch({ control, name: 'pincode' }) || '';
    const { location, loading, error } = usePincodeLookup(pincode);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!pincode) {
            setValue('state', '');
            setValue('district', '');
        } else if (location) {
            setValue('district', location.district || '');
            setValue('state', location.state || '');
        }
    }, [location, setValue, pincode]);

    return (
        <div className="px-4 py-6 sm:px-6 bg-landing-tertiary rounded-xl relative z-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <ControlledInput
                    placeholder="Your Full Name"
                    name="name"
                    label="Full Name"
                    control={control}
                />
                {landing_page_id === "laxmi-narasimha-yajna-seva" && (
                    <ControlledInput
                        placeholder="Your Gotra"
                        name="gotra"
                        label="Gotra"
                        control={control}
                    />
                )}
                <ControlledPhoneInput
                    control={control}
                    name="phone"
                    label="WhatsApp Number"
                    hideDropdown
                />
                <ControlledInput
                    placeholder="Your Email"
                    type="email"
                    name="email"
                    label="Email"
                    control={control}
                />
                <div>
                    <ControlledDatePicker
                        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() - 10))}
                        className="text-xs"
                        control={control}
                        name="dob"
                        label="Date of Birth (Optional)"
                    />
                    <p className="font-semibold text-xs mt-1 w-full">
                        Sankalp and Aarti will be performed for you on your birthday.
                    </p>
                </div>
                <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-5 -mt-4">
                    <div className="w-full">
                        <ControlledInput
                            placeholder="City Pincode"
                            name="pincode"
                            label="Pincode"
                            control={control}
                        />
                        {loading && (
                            <p className="text-xs mt-1">Checking pincode…</p>
                        )}
                        {error && (
                            <p className="text-xs mt-1 text-red-500"> {error}</p>  
                        )}
                    </div>
                    {pincode.length === 6 && !loading && location && (
                        <>
                            <Popover open={open === 'district'} onOpenChange={(v) => setOpen(v ? 'district' : false)}>
                                <PopoverTrigger asChild>
                                    <div
                                        className="w-full cursor-not-allowed"
                                        onClick={() => setOpen('district')}
                                    >
                                        <ControlledInput
                                            placeholder="District"
                                            name="district"
                                            label="District"
                                            control={control}
                                            disabled
                                            className="w-full pointer-events-none"
                                        />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent
                                    side="top"
                                    align="center"
                                    className="text-xs bg-landing-foreground text-landing-background px-3 py-2 rounded-md shadow border-none -mt-1"
                                >
                                    Try changing the pincode to update the district.
                                    <PopoverArrow className="fill-landing-foreground" />
                                </PopoverContent>
                            </Popover>

                            <Popover open={open === 'state'} onOpenChange={(v) => setOpen(v ? 'state' : false)}>
                                <PopoverTrigger asChild>
                                    <div
                                        className="w-full cursor-not-allowed"
                                        onClick={() => setOpen('state')}
                                    >
                                        <ControlledInput
                                            placeholder="State"
                                            name="state"
                                            label="State"
                                            control={control}
                                            disabled
                                            className="w-full pointer-events-none"
                                        />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent
                                    side="top"
                                    align="center"
                                    className="bg-landing-foreground text-landing-background text-xs px-3 py-2 rounded-md shadow border-none -mt-1"
                                >
                                    Try changing the pincode to update the state.
                                    <PopoverArrow className="fill-landing-foreground" />
                                </PopoverContent>
                            </Popover>
                        </>
                    )}

                </div>
                <div className="col-span-full">
                    <TransactionFeesField control={control} parent={parent} />
                </div>
                <div className="col-span-full">
                    <MahaPrasadamField control={control} parent={parent} />
                </div>
                <div className="flex flex-col gap-2">
                    {(pageType === "charitable" || pageType === "all") && (
                        <TaxField control={control} parent={parent} />
                    )}
                    <PatronshipField control={control} parent={parent} />
                </div>
            </div>

            <div className="w-full flex justify-end items-center ml-auto">
                <Button
                    type="submit"
                    disabled={mutation.isPending || isDisabled}
                    className="flex items-center justify-center py-3 h-12 w-[40%] rounded-xl shadow-md bg-landing-primary text-white font-medium hover:scale-105 duration-150 active:scale-95 active:brightness-90"
                >
                    {mutation.isPending ? <Spinner className="border-current" /> : "Donate"}
                </Button>
            </div>
        </div>
    );
}


function TaxField({ control, parent }) {

    const taxField = useWatch({
        control,
        name: "tax_benefits",
    });

    const amount = useWatch({
        control,
        name: "amount",
    });
    const showTaxFields = amount >= 1100 || parent == "c"
    return (
        showTaxFields && (
            <div className="w-full">

                <label className="flex items-center gap-2 col-span-full text-sm mb-2">
                    <ControlledCheckbox
                        control={control}
                        name={"tax_benefits"}
                    />
                    <div>I would like to avail tax benefits</div>
                </label>

                {
                    taxField &&

                    <ControlledInput
                        control={control}
                        name={"pan_number"}
                        placeholder={"Enter PAN Number"}
                        label={"PAN Number (optional)"}
                    />
                }

            </div>
        )
    );
}

function PatronshipField({ control, parent }) {
    const fieldWatch = useWatch({
        control,
        name: "patronship_upgrade",
    });

    const amount = useWatch({
        control,
        name: "amount",
    });
    const showPatronshipFields = amount >= 1100 || parent == "c"
    const options = useMemo(() => {
        return (
            [
                {
                    label: "1.5 Lakhs - Special Life Patron",
                    value: "Special Life Patron"
                },
                {
                    label: "2.5 Lakhs - Principal Life Patron",
                    value: "Principal Life Patron"
                },
                {
                    label: "5 Lakhs - Chief Life Patron",
                    value: "Chief Life Patron"
                },
                {
                    label: "11 Lakhs - Royal Life Patron",
                    value: "Royal Life Patron"
                },
                {
                    label: "25 Lakhs - Special Founder Patron",
                    value: "Special Founder Patron"
                },
            ]
        )
    }, []);

    return (
        showPatronshipFields && (
            <div className="w-full">
                <label className="flex items-center gap-2 text-sm mb-2">
                    <ControlledCheckbox
                        control={control}
                        name={"patronship_upgrade"}
                    />
                    <div>
                        <span>Upgrade later to Membership?</span>
                        <Popover>
                            <PopoverTrigger className="ml-2 text-xs inline underline font-bold">
                                What&apos;s this?
                            </PopoverTrigger>
                            <PopoverContent className="w-72 text-sm bg-landing-foreground text-landing-background font-semibold rounded-xl border-none shadow-md py-2 text-justify">

                                <PopoverArrow className="fill-landing-foreground" />
                                <div>
                                    This is an option for the donor to upgrade later to
                                    a membership. If selected, your current donation
                                    will be considered as part of membership to be
                                    decided later. We will reach out to you with further
                                    information.
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </label>

                {
                    fieldWatch &&

                    <Controller
                        name="patronship_type"
                        control={control}
                        render={({
                            field: { value, onChange, ref },
                            fieldState: { error },
                        }) => {
                            return (
                                <div className="w-full relative">
                                    <label className="w-full">
                                        <div className="text-xs mb-1">Membership</div>
                                        <Select onValueChange={onChange} defaultValue={value}>
                                            <SelectTrigger className={cn("bg-landing-background border-b-2 border-t-0 border-l-0 border-r-0 border-transparent shadow-none rounded-lg h-10 ", error ? "border-red-600/80" : "focus:border-landing-primary border-transparent")}>
                                                <SelectValue
                                                    placeholder="Select Membership"
                                                />
                                            </SelectTrigger>
                                            <SelectContent className="bg-landing-background">
                                                {options.map((type, index) => (
                                                    <SelectItem className="" key={index} value={type.value}>
                                                        {type.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </label>
                                    {error && <p className="absolute -bottom-4 text-xs text-red-600">{error.message} </p>}
                                </div>
                            )
                        }}
                    />
                }

            </div>
        )
    );
}

function TransactionFeesField({ control, parent }) {

    let sqftWatch = parseFloat(useWatch({
        control,
        name: parent == "c" ? "sqft" : "amount"
    }));

    let amount;

    if (parent == "c") {
        amount = sqftWatch * 1800;
        amount = (!amount || amount <= 0) ? "" : amount;
    } else {
        amount = sqftWatch
    }

    const transactionFee = useMemo(() => {
        if (amount) {
            return parseInt(amount / 49)
        }
        return 0;
    }, [amount])


    return (
        !!(amount && transactionFee) && <label className="flex items-center gap-2 col-span-full text-sm relative z-0">
            <ControlledCheckbox
                control={control}
                name={"add_pg_fee"}
            // name={"add_transaction_fee"} 
            />
            <div>I will generously add <span className="font-bold">Rs. {transactionFee}</span> to cover the transaction fees so you can keep 100% of my donation.</div>
        </label>
    )
}
