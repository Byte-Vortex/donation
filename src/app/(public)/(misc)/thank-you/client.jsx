"use client";

import { jwtDecode } from "jwt-decode";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { Image } from "@/components/image";
import { Button } from "@/components/ui/button";
import DecorationProp from "@/assets/images/prop-2.svg";
import PrasadamGif from "@/assets/prasadam.gif";
import { motion, AnimatePresence } from "framer-motion";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function DonationCard({ image, imageAlt, title, link }) {
    return (
        <Link
            href={`${BASE_URL}${link}`}
            className="group bg-background block w-64 max-w-72 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
        >
            <div className="relative h-40 w-full">
                <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={image}
                />
            </div>
            <div className="flex justify-between items-center text-center p-3 gap-2">
                <h5 className="text-sm">{title}</h5>
                <Button className="text-white rounded-md">Donate Now</Button>
            </div>
        </Link>
    );
}

export function ThankYouClient({ children }) {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [showPreload, setShowPreload] = useState(false);
    const [decoded, setDecoded] = useState(null);

    useEffect(() => {
        if (!token) return notFound();

        try {
            const data = jwtDecode(token);
            setDecoded(data);

            if (data.mahaprasadam) {
                setShowPreload(true);
                setTimeout(() => setShowPreload(false), 5000);
            }

            window.dataLayer?.push({
                event: "payment-success",
                ...data,
            });
        } catch (err) {
            console.error("Invalid token:", err);
            return notFound();
        }
    }, [token]);

    if (!decoded) return null;

    const cards = decoded.cards?.data || [];

    return (
        <>
            <AnimatePresence>
                {decoded.mahaprasadam && showPreload ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-50 bg-background flex items-center justify-center"
                    >
                        <Image
                            loadingAnimation={false}
                            unoptimized
                            src={PrasadamGif.src}
                            alt="Sending Mahaprasadam"
                            width={250}
                            height={250}
                            className="w-3/4 h-3/4 object-contain"
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="thankyou"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        className="bg-white"
                    >
                        <div className="max-w-7xl mx-auto px-4 py-6 space-y-4 text-center">
                            <FaCheckCircle className="w-20 h-20 mx-auto text-green-500" />
                            <h3 className="font-bold text-center max-w-5xl mx-auto">
                                Thank you &nbsp;
                                <span className="text-primary font-bold">{decoded.name}</span>&nbsp;
                                for making a difference
                            </h3>
                            <p className="bg-background p-4 rounded-xl max-w-2xl mx-auto">
                                Thank you for Successfully Donating
                                <span className="text-lg font-semibold">
                                    &nbsp;₹ {decoded.amount}&nbsp;
                                </span>
                                to Gupt Vrindavan Dham. You will get a confirmation mail at
                                <span className="text-lg font-semibold">&nbsp;{decoded.email}</span>
                                .
                                <br />
                                {decoded.mahaprasadam && (
                                    <>
                                        <br />
                                        <span className="block">
                                            Your Maha Prasadam will be sent shortly to{" "}
                                            <span className="text-primary">{decoded.full_address}</span>.
                                        </span>
                                    </>
                                )}
                                Your Transaction Tracking Id is &nbsp;
                                <span className="text-lg text-primary font-semibold">
                                    {decoded.tracking_id}
                                </span>
                            </p>

                            <Link
                                href="/"
                                className="bg-primary block max-w-max mx-auto px-6 py-2 rounded-xl text-white hover:brightness-110 active:brightness-95 active:scale-95 duration-150"
                            >
                                Back To Home
                            </Link>

                            {cards.length > 0 && (
                                <>
                                    <h4 className="font-semibold pt-2">You can also Donate For</h4>
                                    <Image
                                        loadingAnimation={false}
                                        className="block mx-auto rotate-180 mb-8 md:mb-12"
                                        src={DecorationProp}
                                        alt=""
                                    />
                                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center">
                                        {cards.slice(0, 4).map((card) => (
                                            <DonationCard
                                                key={card.id}
                                                image={card.imagelink}
                                                imageAlt={card.image_alt}
                                                title={card.title}
                                                link={card.link || ""}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
