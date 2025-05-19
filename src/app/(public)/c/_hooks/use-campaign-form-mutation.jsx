import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner"
import { useDonationFormStore } from "../_store/donation-form.store";
import { useRouter } from "next/navigation";

export function useCampaignFormMutation(type, parent) {

    const setFormTabDetails = useDonationFormStore((state) => state.setFormTabDetails);
    const router = useRouter();

    async function submitData(data) {
        const targetedDomain= "/donation/" + (parent != "c" ? "donationform/" : "campaigndonation/");
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + targetedDomain, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.status >= 400) throw "error";
        const result = await response.json();
        if (result.status !== "success") throw "error";
        return result.data;
    }
    const mutation = useMutation({
        mutationFn: submitData,
        onSuccess: (data) => {
            toast.success("Please checkout!");
            // setFormTabDetails({
            //     current: "payment",
            //     type,
            //     details: data
            // })
            router.push(`/check-out?merchant_id=${data?.merchant_id}&encRequest=${data?.encRequest}&accessCode=${data?.accessCode}`)
        },
        onError: () => toast.error("Something went wrong!")
    })

    return mutation;
}
