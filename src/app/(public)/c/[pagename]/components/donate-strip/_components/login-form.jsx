"use client"

import yup from "@/lib/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ControlledInput } from "@/app/(public)/c/_components/controlled/controlled-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Spinner from "@/components/ui/spinner";
import { useCampaignAuth } from "@/app/(public)/c/_context/context";
import { useRouter } from "next/navigation";



const schema = yup.object({
    email: yup.string().trim().required().email("Enter a valid email!"),
    password: yup.string().trim().required()
})


export function LoginForm() {

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const mutation = useSubmitMutation();

    return (

        <div className="max-w-2xl w-full mx-auto px-4 py-20 bg-landing-tertiary">
            <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit(mutation.mutate, () => toast.error("Please fix form errors!"))}
            >

                <div className="text-center">
                    <h3>Login</h3>
                    <p>Welcome back! Please log in to access your account.</p>
                </div>

                <ControlledInput
                    name="email"
                    control={control}
                    label="Email"
                    placeholder="Enter Email"
                />

                <ControlledInput
                    name="password"
                    type="password"
                    control={control}
                    label="Password"
                    placeholder="Enter Password"
                />

                <button type="submit" className="flex items-center justify-center py-3 px-4 w-full rounded-md shadow-md bg-landing-primary text-white font-medium duration-150 active:scale-95 active:brightness-90">
                    {mutation.isPending ? <Spinner className="border-current" /> : "Login!"}
                </button>

            </form>
        </div>

    )
}

function useSubmitMutation() {

    const { setUser } = useCampaignAuth();

    const router = useRouter();


    async function submitData(data) {

        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/donation/login_usercampaign/", {
            method: 'POST',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.status >= 400) {

            try {
                const result = await response.json();
                throw result;
            } catch (err) {
                throw new Error(err?.message ?? "Something went wrong!");
            }

        }
        return data?.email;
    }


    const mutation = useMutation({
        mutationFn: submitData,
        onSuccess: (data) => {
            setUser(data);
            toast.success("Logged In Successfully!");
            router.replace("/c/profile");
        },
        onError: (err) => {
            toast.error(err);
        }
    });


    return mutation;
}