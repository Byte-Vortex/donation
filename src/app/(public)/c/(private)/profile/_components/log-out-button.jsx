import { MdOutlineLogout } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import Spinner from "@/components/ui/spinner";
import { useCampaignAuth } from "../../../_context/context";
import { toast } from "sonner";

export function LogOutButton() {

    const { setUser } = useCampaignAuth();

    async function submitData() {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/donation/logoutuser/", {
            method: 'POST',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (response.status >= 400) {
            throw result;
        }
        return result;
    }


    const mutation = useMutation({
        mutationFn: submitData,
        onSuccess: (data) => {
            toast.success("Logged out successfully!");
            setUser("");
        },
        onError: (err) => {
            toast.error(err.message ?? "Something went wrong!");
        }
    });

    return (
        <button type="button" disabled={mutation.isPending} onClick={mutation.mutate} className="flex items-center justify-center gap-1 bg-red-200 text-red-700 text-sm py-2 px-4 rounded-md text-center hover:brightness-105 active:brightness-95 active:scale-95 duration-150">

            {mutation.isPending ?
                <Spinner className="border-current" /> :
                <>
                    <MdOutlineLogout className="text-lg" />
                    <span>Log out</span>
                </>
            }

        </button>
    )
}
