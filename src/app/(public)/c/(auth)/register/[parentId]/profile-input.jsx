import { Controller, useWatch } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { RiUserFill } from "react-icons/ri";

export default function ProfileInput({ control, setValue }) {

    const watchProfile = useWatch({ control, name: "profilephoto" });


    return (
        <div className="w-full">

            <div className="text-center text-sm mb-2">Profile Photo</div>

            <label title="profile photo" className="w-36 h-36 rounded-full block mx-auto mb-2 shadow-input cursor-pointer relative group">

                <Controller
                    name={"profilephoto"}
                    // defaultValue={[]}
                    control={control}
                    render={({ field: { name, onChange, ref }, fieldState: { error } }) => {

                        return (

                            <input
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
                    watchProfile && <button type="button" onClick={setValue.bind(null, "profilephoto", null)} className="flex items-center justify-center w-6 h-6 bg-red-200 text-red-700 rounded-full absolute top-1 hover:brightness-125 right-1 duration-200">
                        <IoMdClose />
                    </button>
                }

                <div className="flex items-center justify-center p-2 bg-landing-primary text-background rounded-full w-max h-max absolute bottom-1 group-hover:brightness-125 right-1 duration-200">
                    <MdModeEdit />
                </div>


                <div className="overflow-hidden h-full w-full rounded-full">

                    {!watchProfile?.length ?
                        <div className="bg-gray-200 h-full w-full flex items-center justify-center text-8xl">
                            <RiUserFill />
                        </div> :

                        (
                            <img className="w-full h-full object-cover"
                                src={URL.createObjectURL(watchProfile[0])}
                                alt="Profile Photo"
                            />

                        )
                    }

                </div>
            </label>


            <div className="text-center text-xs font-bold">*Image should be jpg, png or jpeg and size needs to be less than 1 MB</div>

        </div>
    )
}

