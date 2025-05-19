import { FaUserAlt } from "react-icons/fa";
import Link from "next/link";
import { useCampaignAuth } from "../../../_context/context";
import { useEffect, useState } from "react";
import { LoginForm } from "./_components/login-form";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"


export function LoginProfileButton() {

    const [mounted, setMounted] = useState(false);

    const { user } = useCampaignAuth();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (

        user ?

            <Link href={"../profile"} className="rounded-[7px] text-nowrap px-4 py-1 gap-2 bg-white text-landing-primary flex items-center justify-center">

                <span>{"Profile"}</span>
                <FaUserAlt />

            </Link>
            :

            <Dialog>
                <DialogTrigger asChild>
                    <button className="rounded-[7px] text-nowrap px-4 py-1 gap-2 bg-white text-landing-primary flex items-center justify-center">
                        Login
                    </button>
                </DialogTrigger>
                <DialogContent className="px-0 py-0 rounded-xl overflow-hidden">
                    <LoginForm />
                </DialogContent>
            </Dialog>

    )
}