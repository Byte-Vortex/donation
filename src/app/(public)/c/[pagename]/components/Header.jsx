import { BsWhatsapp as WhatsappIcon } from "react-icons/bs";
import Logo from "@/assets/images/gupt-vrindavan-dham-logo.png"
import { Image } from "@/components/image";

export default function Header({ donationDetails }) {

    return (
        <>

            <header className="bg-transparent w-full">

                <div className="py-1 h-10 flex items-center px-4 w-full gap-2 bg-gradient-to-b from-landing-primary/60">


                    <Image loadingAnimation={false} className="h-auto max-w-[55px]" src={Logo} alt="HKM Logo" />

                    <a target="_blank" rel="noopener"  href={"https://wa.me/" + donationDetails.mobile_number} className="ml-auto text-landing-primary bg-landing-background shadow-md shadow-landing-background/40 font-bold h-7 w-7 rounded-full text-2xl flex items-center justify-center">
                        <WhatsappIcon className="inline text-[16px]" />
                    </a>

                    <a href="#form" className="rounded-[7px] text-sm md:text-base text-landing-primary bg-landing-background shadow-md shadow-landing-background/40 font-semibold py-.5 px-4 ml-1">Donate</a>


                </div>
            </header>
        </>
    )
}