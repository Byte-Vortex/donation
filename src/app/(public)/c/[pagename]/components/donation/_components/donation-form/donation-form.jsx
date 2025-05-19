"use client"

import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import CopyToClipboard from "@/components/ui/copy-to-clipboard"
import { useDonationFormStore } from "@/app/(public)/c/_store/donation-form.store"
import { IndianForm } from "./_components/indian-form"
import { ForeignForm } from "./_components/foreign-form"

export default function DonationForm({ basicDetails, data }) {
    const parent = data ? "landing" : "c"
    const bankDetails = basicDetails.bankDetails
    const [selected, setSelected] = useState("indian")
    const formTabDetails = useDonationFormStore((state) => state.formTabDetails)

    return (
        <div className="w-full space-y-4">
            <div className="w-full bg-landing-background rounded-xl relative z-[1] overflow-hidden cursor-pointer">
                <button
                    type="radio"
                    name="statuses"
                    onClick={setSelected.bind(null, "indian")}
                    className={clsx(
                        'p-4 w-1/2 relative duration-300 z-[2]',
                        selected === 'indian' && 'text-landing-background'
                    )}
                >
                    Indian&nbsp;<span className="max-[400px]:hidden">Currency</span>
                </button>
                <button
                    onClick={setSelected.bind(null, "non-indian")}
                    className={clsx(
                        'p-4 w-1/2 duration-300 relative z-[2]',
                        selected === 'non-indian' && 'text-landing-background'
                    )}
                >
                    Non-Indian&nbsp;<span className="max-[400px]:hidden">Currency</span>
                </button>

                <div
                    className={clsx(
                        'w-1/2 rounded-xl bg-landing-primary duration-150 h-full border-landing-background border-2 top-0 left-0 absolute z-[1]',
                        selected === 'indian' ? 'translate-x-0' : 'translate-x-full'
                    )}
                />
            </div>

            {selected === "indian" ? (
                <IndianForm
                    basicDetails={basicDetails}
                    data={data}
                    pageType="charitable"
                    parent={parent}
                />
            ) : (
                <ForeignForm
                    basicDetails={basicDetails}
                    data={data}
                    pageType="charitable"
                    parent={parent}
                />
            )}

            {formTabDetails.type === "foreign" ? (
                <div className="flex flex-col gap-8 bg-landing-background rounded-xl p-6">
                    <h3 className="text-3xl font-bold text-center">
                        Thank You for your consideration to Donate.
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6 min-h-52">
                        <div className="bg-surface text-on-surface min-h-full rounded-xl elevation-1 p-6">
                            <h4 className="flex items-center justify-center gap-2 max-w-max font-bold text-landing-primary mb-2">
                                <span className="font-semibold">Bank account details</span>
                                <CopyToClipboard
                                    text={
                                        "Account Name: " + bankDetails.account_name + "\n" +
                                        "Account Number: " + bankDetails.account_number + "\n" +
                                        "Bank Name: " + bankDetails.bank_name + "\n" +
                                        "IFSC Code: " + bankDetails.ifsc_code + "\n"
                                    }
                                />
                            </h4>

                            <div className="flex flex-col gap-y-3">
                                <div>
                                    <span>Account Name:</span>&nbsp;
                                    <span className="font-bold inline-flex items-center gap-2">
                                        {bankDetails.account_name}
                                        <CopyToClipboard text={bankDetails.account_name} />
                                    </span>
                                </div>

                                <div>
                                    <span>Account Number:</span>&nbsp;
                                    <span className="font-bold inline-flex items-center gap-2">
                                        {bankDetails.account_number}
                                        <CopyToClipboard text={bankDetails.account_number} />
                                    </span>
                                </div>

                                <div>
                                    <span>Bank Name:</span>&nbsp;
                                    <span className="font-bold inline-flex items-center gap-2">
                                        {bankDetails.bank_name}
                                        <CopyToClipboard text={bankDetails.bank_name} />
                                    </span>
                                </div>

                                <div>
                                    <span>IFSC Code:</span>&nbsp;
                                    <span className="font-bold inline-flex items-center gap-2">
                                        {bankDetails.ifsc_code}
                                        <CopyToClipboard text={bankDetails.ifsc_code} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ):null}
        </div>
    )
}

function PaymentIframe() {
    const formTabDetails = useDonationFormStore((state) => state.formTabDetails)
    const ref = useRef()

    useEffect(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' })
    }, [])

    return (
        <iframe
            ref={ref}
            className="w-full"
            height={1000}
            id="paymentFrame"
            src={`https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${formTabDetails.details.merchant_id}&encRequest=${formTabDetails.details.encRequest}&access_code=${formTabDetails.details.accessCode}`}
        />
    )
}
