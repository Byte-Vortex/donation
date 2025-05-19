"use client"

import { useLayoutEffect, useState } from "react";
import { useCampaignAuth } from "../_context/context"
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";

export default function AuthLayout({ children }) {

    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const { user } = useCampaignAuth();

    useLayoutEffect(() => {
        setMounted(true);
        if (!!user) router.replace("/c/profile");
    }, [user]);

    if (!mounted || !!user) return (
        <div className="flex items-center justify-center min-h-screen">
            <Spinner />
        </div>
    );

    return children;
}