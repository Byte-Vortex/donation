import Spinner from "@/components/ui/spinner";
import { ControlledInput } from "../../../_components/controlled/controlled-input";

import { ControlledTextarea } from "../../../_components/controlled/controlled-textarea";
import { useCampaignAuth } from "../../../_context/context";
import { convertFileToBase64 } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { MdModeEdit } from "react-icons/md";
import { RiUserFill } from "react-icons/ri";
import { toast } from "sonner";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export function ProfileForm({ values }) {

    const [disabled, setDisabled] = useState(true);

    const { control, handleSubmit, setValue } = useForm({
        // resolver: yupResolver(schema),
        values: {
            message: values.message,
            goal: values.goal,
            profilephoto: values.profilephoto
        }
    });

    const mutation = useSubmitMutation();

    return (
        <form
            className="flex-wrap flex gap-6 items-start w-full bg-landing-tertiary p-4 rounded-lg"
            onSubmit={handleSubmit(mutation.mutate, () => toast.error("Please fix form errors!"))}
        >

            <div className="w-full">

                {
                    disabled
                        ?

                        <button key="edit" type="button" onClick={setDisabled.bind(null, false)} className="ml-auto px-4 text-sm max-w-max flex items-center justify-center py-3 w-full rounded-md shadow-md bg-landing-primary text-white font-medium hover:scale-105 duration-150 active:scale-95 active:brightness-90">
                            Edit Details
                        </button>
                        :

                        <button key="save" type="submit" className="ml-auto px-4 text-sm max-w-max flex items-center justify-center py-3 w-full rounded-md shadow-md bg-landing-primary text-white font-medium hover:scale-105 duration-150 active:scale-95 active:brightness-90">
                            {mutation.isPending ? <Spinner className="border-current" /> : "Save Details"}

                        </button>
                }

            </div>

            <ProfileInput control={control} disabled={disabled} setValue={setValue} />


            <div className="flex-grow space-y-4">
                {/* <div className="text-center text-landing-secondary font-bold mb-2">A message from the campaigner</div> */}

                <h3>{values.name}</h3>

                <ControlledTextarea
                    disabled={disabled}
                    name="message"
                    control={control}
                    label="Your Campaign Message"
                    placeholder="Your Campaign Message"
                />

                <ControlledInput
                    disabled={disabled}
                    name="goal"
                    control={control}
                    label="Square Feet Goal"
                    placeholder="Your Square Feet Goal"
                />
            </div>

        </form>
    )
}


function useSubmitMutation() {

    const router = useRouter();

    const { user, setUser } = useCampaignAuth();

    const queryClient = useQueryClient();

    async function submitData(data) {
        const profilePhoto = data["profilephoto"];
        if (profilePhoto && typeof profilePhoto !== "string") {
            if (profilePhoto?.[0]) {
                data["profilephoto"] = await convertFileToBase64(profilePhoto[0]);
            }

        }

        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/donation/update_user_profile/", {
            method: 'POST',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.status >= 400) {
            throw {
                data: result,
                status: response.status
            }
        }
        return result;
    }


    const mutation = useMutation({
        mutationFn: submitData,
        onSuccess: () => {
            toast.success("Changes Saved!");
            queryClient.invalidateQueries({
                queryKey: ["campaign", "user", user]
            })

        },
        onError: (err) => {
            console.log(err);
            if (err.status === 401) {
                setUser("");
                router.replace("/c/login");
                toast.error("Session Expired, Please login again!");

            }
            else toast.error(err.data.message ?? "Something went wrong!");
        }
    });


    return mutation;
}

function ProfileInput({ control, disabled, setValue }) {

    const watchProfile = useWatch({ control, name: "profilephoto" });

    return (
        <div className="w-full min-w-[12rem] max-w-[12rem] flex flex-col mx-auto">

            <div className="text-center text-sm mb-2">Profile Photo</div>

            <label title="profile photo" className="h-52 rounded-lg overflow-hidden border-4 border-landing-secondary block mb-2 cursor-pointer relative group">

                <Controller
                    name={"profilephoto"}
                    control={control}
                    render={({ field: { name, onChange, value, ref }, fieldState: { error } }) => {

                        return (

                            <input
                                disabled={disabled}
                                accept="image/jpg, image/jpeg, image/png"
                                type="file"
                                className="opacity-0 absolute top-0 left-0"
                                ref={ref}
                                name={name}
                                onChange={(event) => {
                                    return onChange(event.target.files);
                                }}
                            />
                        )
                    }}
                />


                {
                    (!disabled && watchProfile) && <button type="button" onClick={setValue.bind(null, "profilephoto", null)} className="flex items-center justify-center w-6 h-6 bg-red-200 text-red-700 rounded-full absolute top-1 hover:brightness-125 right-1 duration-200">
                        <IoMdClose />
                    </button>
                }

                {
                    !disabled && <div className="flex items-center justify-center p-2 bg-landing-primary text-background rounded-full w-max h-max absolute bottom-1 group-hover:brightness-125 right-1 duration-200">
                        <MdModeEdit />
                    </div>
                }


                <div className="overflow-hidden h-full w-full">

                    {!watchProfile?.length ?
                        <div className="bg-gray-200 h-full w-full flex items-center justify-center text-8xl">
                            <RiUserFill />
                        </div> :

                        (
                            <img className="w-full h-full object-cover"
                                src={
                                    typeof watchProfile === 'string' ?
                                        (BASE_URL + watchProfile) :
                                        URL.createObjectURL(watchProfile?.[0])
                                }
                                alt="Profile Photo"
                            />

                        )
                    }

                </div>
            </label>

        </div>
    )
}

