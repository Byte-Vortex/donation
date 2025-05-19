import { Image } from "@/components/image";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function RecursiveCards({ data }) {

    return (

        <div className="space-y-2">
            <CampaignAccordion data={data.children} />
            <CampaignTransactions data={data.transactions} />
        </div>
    )
}

function CampaignAccordion({ data }) {
    const [viewMore, setViewMore] = useState(true);
    return (
        !!data?.length && <Accordion type="multiple" collapsible={true} className="w-full flex flex-col gap-2">

            {
                data.map((item, index) => {

                    if (viewMore && index >= 3) return null;

                    return (
                        <AccordionItem
                            value={index + ""}
                            className="border-0 m-0"
                            key={index}
                            disabled={!(item.children?.length || item.transactions?.length)}
                        >
                            <AccordionTrigger
                                className="bg-landing-tertiary p-4 rounded-md text-left group text-sm md:text-base"
                            >

                                <div className="flex gap-4 items-center">

                                    {item.profilephoto ? <div className="min-w-10 min-h-10 max-w-10 max-h-10 h-10 w-10 rounded-full overflow-hidden relative">
                                        <Image
                                        fill
                                            className="w-full h-full object-cover"
                                            src={BASE_URL + item.profilephoto}
                                        />
                                    </div>
                                        :
                                        <div className="min-w-10 min-h-10 max-w-10 max-h-10 h-10 w-10 rounded-full overflow-hidden flex items-center justify-center font-bold text-lg bg-landing-background">
                                            {item.name[0]}
                                        </div>
                                    }

                                    <div className="flex-grow space-y-1">
                                        <p className="group-hover:underline">
                                            <span className="font-bold text-landing-secondary">{item.name}</span> Campaign Raised&nbsp;
                                            <span className="font-bold text-landing-secondary">{item.sqft_raised} Sq. Ft.</span>

                                            &nbsp;&nbsp;
                                            <span className="font-bold text-landing-secondary">
                                                (&nbsp;{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
                                                    item.amount_raised,
                                                )}&nbsp;)
                                            </span>
                                            &nbsp;&nbsp;
                                            out of a goal of&nbsp;&nbsp;<span className="text-landing-secondary font-bold">{item.sqft_goal} Sq. Ft.</span>

                                        </p>

                                        <div className="flex gap-2">
                                            <span className="bg-landing-background rounded-md text-xs text-landing-primary max-w-max px-2 py-1 font-bold">{item.children?.length} Subcampaign</span>
                                            <span className="bg-landing-background rounded-md text-xs text-landing-primary max-w-max px-2 py-1 font-bold">{item.transactions?.length} Donor</span>
                                        </div>
                                    </div>


                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-base mt-2 ml-4">
                                <RecursiveCards data={item} />
                            </AccordionContent>
                        </AccordionItem>
                    )
                })
            }

            {
                data.length > 3 && <button onClick={() => setViewMore(state => !state)} className="text-left text-landing-primary hover:underline">
                    View {viewMore ? "More" : "Less"} Campaigns
                </button>
            }

        </Accordion>
    )
}

function CampaignTransactions({ data }) {

    const [viewMore, setViewMore] = useState(true);

    return (

        <>
            {
                data?.map((item, index) => {

                    if (viewMore && index >= 3) return null;
                    return (<div key={index} className="bg-landing-tertiary p-4 rounded-md text-left flex gap-4 items-center" >

                        <div className="min-w-10 min-h-10 max-w-10 max-h-10 h-10 w-10 rounded-full overflow-hidden flex items-center justify-center font-bold text-lg bg-landing-background">
                            {item.name[0]}
                        </div>

                        <div className="flex-grow">
                            <p>
                                <span className="font-bold text-landing-secondary">{item.name}</span> Donated&nbsp;
                                <span className="font-bold text-landing-secondary">{item.sqft} Sq. Ft.</span>&nbsp;&nbsp;
                                <span className="font-bold text-landing-secondary">
                                    (&nbsp;{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
                                        item.amount,
                                    )}&nbsp;)
                                </span>

                            </p>
                        </div>

                    </div>
                    )
                })
            }

            {
                data.length > 3 && <button onClick={() => setViewMore(state => !state)} className="text-left text-landing-primary hover:underline">
                    View {viewMore ? "More" : "Less"} Transactions
                </button>
            }

        </>



    )
}