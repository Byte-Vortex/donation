"use client"

import yup from "@/lib/yup";
import { convertFileToBase64, isValidPhoneNumber } from "@/lib/utils";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { ControlledInput } from "../../../_components/controlled/controlled-input";
import { ControlledPhoneInput } from "../../../_components/controlled/controlled-phone-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { ControlledTextarea } from "../../../_components/controlled/controlled-textarea";
import Spinner from "@/components/ui/spinner";
import ProfileInput from "./profile-input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";


// const validFileExtensions = { image: ['jpg', 'png', 'jpeg'] };

// function isValidFileType(fileName, fileType) {
//     return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
// }



const schema = yup.object({
    parent_campaign: yup.string().required(),
    name: yup.string().trim().required().test(
        'is-alpha-space',
        'Must be Alphabets only!',
        (value) => {

            for (let ch of value) {
                if (ch === ' ' || ('a' <= ch && ch <= 'z') || ('A' <= ch && ch <= 'Z')) continue;
                return false;
            }
            return true;
        },
    ),
    short_initial: yup.string().when('name', {
        is: (name) => name?.startsWith("hkm-"),
        then: (schema) => schema.required(),
    }),
    phone: yup.string().trim().required().test('is-valid-phone-number', "Enter a valid Number!", isValidPhoneNumber),
    email: yup.string().trim().required().email("Enter a valid email!"),
    campaign_message: yup.string().trim().required(),
    sqft_goal: yup.number().min(1).required(),
    // profilephoto: yup.mixed()
    //     .test("is-valid-type", "Not a valid image type",
    //         value => isValidFileType(value?.[0].name.toLowerCase(), "image"))
    //     .test("is-valid-size", "Max allowed size is 1MB",
    //         value => value?.[0].size <= 1024)
})



export default function Page() {

    const { parentId } = useParams();

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            sqft_goal: 108,
            parent_campaign: parentId,
            campaign_message: 'Lord Krishna says in Bhagavad-Gita 9.27:\n"Whatever you give in charity - do that as an offering to Me."'
        },
        resolver: yupResolver(schema),
    });

    const mutation = useSubmitMutation();


    return (
        <div className="bg-white">
            <div className="max-w-4xl mx-auto px-4 py-20 space-y-4">
                <div className="p-4">
                    <h3>Start your fundraising Campaign</h3>
                    <ul className="list-inside list-disc">
                        <li>Create your own fundraising campaign</li>
                        <li>Share your campaign with your friends & family</li>
                        <li>Encourage them to donate & start their own campaign</li>
                    </ul>
                </div>
                <form
                    className="bg-landing-tertiary p-4 md:p-6 flex flex-col gap-6"
                    onSubmit={handleSubmit(mutation.mutate, () => toast.error("Please fix form errors!"))}
                >

                    <ProfileInput
                        setValue={setValue}
                        control={control}
                    />

                    <div className="grid md:grid-cols-2 gap-6">

                        <NameFields control={control} />

                        <ControlledInput
                            name="email"
                            type="email"
                            control={control}
                            label="Email Id"
                            placeholder="Enter Email Id"
                        />

                        <ControlledPhoneInput
                            label={"Whatsapp No."}
                            control={control}
                            name={"phone"}
                        />

                        <ControlledInput
                            name="sqft_goal"
                            control={control}
                            label="Square Feet Goal"
                            placeholder="Your Square Feet Goal"
                        />
                    </div>


                    <ControlledTextarea
                        name="campaign_message"
                        control={control}
                        label="Your Campaign Message"
                        placeholder="Your Campaign Message"
                    />

                    <button type="submit" className="flex items-center justify-center py-3 px-4 w-full rounded-md shadow-md bg-landing-primary text-white font-medium hover:scale-105 duration-150 active:scale-95 active:brightness-90">
                        {mutation.isPending ? <Spinner className="border-current" /> : "Register!"}
                    </button>

                    <div className="text-center mt-4">
                        Already have a campaign?
                        <Link href="/c/login" className="text-landing-primary font-bold hover:underline ml-1">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

function useSubmitMutation() {

    const router = useRouter();


    async function submitData(data) {

        const profilePhoto = data["profilephoto"]?.[0];
        if (profilePhoto) {
            data["profilephoto"] = await convertFileToBase64(profilePhoto);
        }

        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/donation/create_usercampaign/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        let result = null;
        try {
            result = await response.json();
        } catch (err) {
            throw new Error("Something went wrong!");
        }
        if (response.status >= 400) {
            throw new Error(result?.message ?? "Something went wrong!");
        }
        return result;
    }


    const mutation = useMutation({
        mutationFn: submitData,
        onSuccess: (data) => {
            toast.success("Registered Successfully!");
            //how do I pass state?
            if (window.localStorage) {
                try {
                    localStorage.setItem("page", data?.data?.id);
                } catch (err) { };
            }
            router.replace("/c/" + data?.data?.id);
        },
        onError: (err) => {
            toast.error(err.message ?? "Something went wrong!");
        }
    });


    return mutation;
}

function NameFields({ control }) {

    const nameWatch = useWatch({
        control,
        name: "name"
    })
    return (

        <>
            <ControlledInput
                name="name"
                control={control}
                label="Full Name"
                placeholder="Enter Full Name"
            />


            {
                nameWatch?.startsWith("hkm-")
                && <ControlledInput
                    name="short_initial"
                    control={control}
                    label="Short Initial"
                    placeholder="Enter Short Initial"
                />

            }


        </>
    )
}