"use client"

import { useLayoutEffect, useState } from "react";
import { useCampaignAuth } from "../_context/context"
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";

export default function PrivateLayout({ children }) {

    const [mounted, setMounted] = useState(false);
    const { user } = useCampaignAuth();

    const router = useRouter();

    useLayoutEffect(() => {
        setMounted(true);
        if (!user) router.replace("/c/login");
    }, [user]);

    if (!mounted || !user) return (
        <div className="flex items-center justify-center min-h-screen">
            <Spinner />
        </div>
    );

    return children;
}