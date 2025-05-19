import { FaBan as FailedIcon } from "react-icons/fa";
import Link from "next/link";
import { Footer } from "@/components/footer/footer";

export default function Page() {

    return (
        <>
        <div className="bg-white">


            <div className="max-w-7xl mx-auto px-4 py-16 space-y-8 text-center">

                <p className="bg-yellow-400 font-bold text-lg text-black px-4 py-2 rounded-md text-center max-w-4xl mx-auto">

                    That didn&apos;t work
                </p>
                <FailedIcon className="w-32 h-32 mx-auto text-red-500" />
                <h1 className="text-5xl font-bold text-center max-w-4xl mx-auto">Your transaction failed!</h1>

                <p className="bg-background p-4 rounded-xl max-w-2xl mx-auto">
                    Something went wrong while we were processing your transaction, any money deducted will be refunded.
                </p>


                <Link href={"/"} className="bg-primary block max-w-max mx-auto px-12 py-3 rounded-full text-white hover:brightness-110 active:brightness-95 active:scale-95 duration-150">
                    Back To Home
                </Link>

            </div>

        </div>
        <Footer/>
        </>

    )
}