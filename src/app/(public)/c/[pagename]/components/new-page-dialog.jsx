"use client"

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function NewPageDialog() {

    const params = useParams();
    const [open, setOpen] = useState(() => {

        let savedPagename = null;

        if (window.localStorage) {
            try {
                savedPagename = localStorage.getItem("page");
            } catch (err) { };
        }

        return savedPagename === params.pagename;
    });

    useEffect(() => {

        return () => {
            if (window.localStorage) {
                try {
                    window.localStorage.removeItem("page");
                } catch (err) { };
            }
        }
    }, []);
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog

                onClose={setOpen.bind(null, false)}
                className="relative z-50"
            >
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                {/* Full-screen scrollable container */}
                <div className="fixed inset-0 w-screen overflow-y-auto">
                    {/* Container to center the panel */}
                    <div className="flex min-h-full items-center justify-center p-4">
                        {/* The actual dialog panel  */}

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="text-base text-foreground bg-white py-6 px-4 rounded-xl shadow-md w-full max-w-md min-h-40 sm:min-w-96 flex flex-col gap-4">
                                <Dialog.Title as={Fragment}>
                                    <div className="font-bold space-x-1">
                                        You have successfully created your unique campaign page. Please check your Whatsapp for log in details.
                                    </div>
                                </Dialog.Title>

                                <div className='grid grid-cols-2 gap-4 mt-auto'>

                                    <button
                                        className='border-2 border-landing-primary text-sm p-2 rounded-full text-landing-primary'
                                        type='button'
                                        onClick={setOpen.bind(null, false)}
                                    >
                                        Cancel
                                    </button>


                                    <Link
                                        className='p-2 text-sm rounded-full bg-landing-primary text-landing-background text-center'
                                        type='button'
                                        href={"/c/login"}
                                    >
                                        Login
                                    </Link>

                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}