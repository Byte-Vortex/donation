"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCampaignAuth } from "../../_context/context";
import { ProfileForm } from "./_components/profile-form";
import { RecursiveCards } from "./_components/recursive-cards";
import { IoArrowBackSharp } from "react-icons/io5";
import { LogOutButton } from "./_components/log-out-button";
import Spinner from "@/components/ui/spinner";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function ProfilePage() {

    const query = useProfile();


    if (query.isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Spinner />
        </div>
    )

    if (query.isError) return null;

    const data = query.data;

    return (
        <div className="bg-white">

            <div className="max-w-7xl mx-auto w-full py-20 px-4 space-y-20">

                <div className="flex justify-between items-center">

                    <Link href={"/c/" + data.userdetail.id} className="flex items-center justify-center gap-1 bg-landing-tertiary text-landing-primary text-sm py-2 px-4 rounded-md text-center hover:brightness-105 active:brightness-95 active:scale-95 duration-150">
                        <IoArrowBackSharp />
                        <span>Your Campaign</span>
                    </Link>

                    <LogOutButton />

                </div>

                <div className="space-y-4">
                    <h3>Your Profile</h3>

                    <div className="">
                        <ProfileForm values={data.userdetail} />

                        <div className="space-y-4 mt-8  bg-landing p-4 rounded-lg">
                            <div className="rounded-full w-full h-8 bg-landing-tertiary flex items-center justify-center text-center relative z-0 overflow-hidden">
                                <span className="invert mix-blend-difference z-[1] grayscale">{((data.userdetail.acheived_goal / data.userdetail.goal) * 100).toFixed(2)}%</span>

                                <div
                                    style={{
                                        width: `${(data.userdetail.acheived_goal / data.userdetail.goal) * 100}%`
                                    }}
                                    className="h-full absolute top-0 left-0 z-0 bg-landing-foreground"
                                />
                            </div>

                            <p>
                                <span className="text-xl font-bold text-landing-secondary">{data.userdetail.acheived_goal} Sq. Ft.</span>&nbsp;
                                raised of <span className="text-landing-secondary font-bold">{data.userdetail.goal} Sq. Ft.</span> goal.&nbsp;
                                <span className="text-landing-secondary font-bold">{((data.userdetail.acheived_goal / data.userdetail.goal) * 100).toFixed(2)}%</span>&nbsp;
                                of goal met.

                            </p>
                        </div>

                    </div>
                </div>



                <div className="space-y-4">

                    <h3>Campaign Details</h3>

                    <div className="flex gap-2">
                        <span className="bg-landing-tertiary rounded-md text-sm text-landing-primary max-w-max px-2 py-1 font-bold">{data.campaign_hierarchy.children?.length} Subcampaign</span>
                        <span className="bg-landing-tertiary rounded-md text-sm text-landing-primary max-w-max px-2 py-1 font-bold">{data.campaign_hierarchy.transactions?.length} Donor</span>
                    </div>
                    <RecursiveCards
                        data={{
                            children: data.campaign_hierarchy.children,
                            transactions: data.campaign_hierarchy.transactions
                        }}
                    />

                </div>
            </div>
        </div>
    )
}

function useProfile() {

    const { user, setUser } = useCampaignAuth();
    const router = useRouter();
    const queryClient = useQueryClient();

    async function fetchData() {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/donation/user_profile/", {
            credentials: "include",
        });
        if (response.status >= 400) {
            throw ({
                data: "error",
                status: response.status
            })
        }
        const data = await response.json();
        return data?.data;
    }


    const query = useQuery({
        queryKey: ["campaign", "user", user],
        queryFn: fetchData,
    });

    useEffect(() => {
        if (!query.error) return;
        const err = query.error;
        queryClient.cancelQueries(["campaign", "user", user]);
        if (err.status === 401) {
            setUser("");
            router.replace("/c/login");
            toast.error("Session Expired, Please login again!");

        }

    }, [query.error]);


    return query;
}

