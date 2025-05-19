import { BiLogoFacebook as FacebookIcon } from "react-icons/bi";
import { BiLogoInstagram as InstagramIcon } from "react-icons/bi";
import { FaXTwitter as XIcon } from "react-icons/fa6";
import { AiOutlineYoutube as YoutubeIcon } from "react-icons/ai";
import { BsWhatsapp as WhatsappIcon, BsEnvelope as MailOutlineIcon } from "react-icons/bs";
import Link from "next/link";

import { AiOutlineHome } from "react-icons/ai";

import { getBasicDetails } from "@/server/get-basic-details";
export default async function Header() {

    const basicDetails = await getBasicDetails();
    return (
        <header className="bg-transparent w-full absolute z-20 top-2 left-0 p-2 text-foreground">

            <div data-aos="fade-down" data-aos-delay="300" className="max-w-7xl w-full flex justify-between items-center mx-auto rounded-full bg-black/20 border-2 border-white/20 px-6 py-2 backdrop-blur-sm">

                <div className="flex w-full text-xs md:text-base md:w-max flex-wrap justify-between items-center gap-6 text-white">

                    <div className="flex gap-4 items-center">
                        <Link href="/" className="text-2xl hover:text-patron-card-background">
                            <AiOutlineHome />
                        </Link>
                        <a target="_blank" rel="noopener"  href={"mailto:" + basicDetails.contact_email} className="space-x-1 hover:underline">
                            <MailOutlineIcon className="inline mr-1 text-xl" />
                            <span className="hidden min-[450px]:inline">
                                {/* info@guptvrindavandham.org */}
                                {basicDetails.contact_email}
                            </span>
                        </a>

                    </div>

                    <a target="_blank" rel="noopener"  href={"https://wa.me/" + basicDetails.whatsapp_number} className="space-x-1 hover:underline">
                        <WhatsappIcon className="inline mr-1 text-xl" />
                        <span>
                            {basicDetails.phone_number}
                        </span>
                    </a>
                </div>

                <div className="hidden md:flex items-center space-x-4 text-lg">

                    <a
                        href={basicDetails.socials.youtube}
                        target="_blank" rel="noopener" 
                        className="rounded-xl bg-white flex items-center justify-center hover:bg-patron-card-background hover:text-white duration-150 transition-all h-8 w-8"
                    >
                        <YoutubeIcon />
                    </a>

                    <a
                        href={basicDetails.socials.instagram}
                        target="_blank" rel="noopener" 
                        className="rounded-xl bg-white flex items-center justify-center hover:bg-patron-card-background hover:text-white duration-150 transition-all h-8 w-8"
                    >
                        <InstagramIcon />
                    </a>

                    <a
                        href={basicDetails.socials.twitter}
                        target="_blank" rel="noopener" 
                        className="rounded-xl bg-white flex items-center justify-center hover:bg-patron-card-background hover:text-white duration-150 transition-all h-8 w-8"
                    >
                        <XIcon />
                    </a>

                    <a
                        href={basicDetails.socials.facebook}
                        target="_blank" rel="noopener" 
                        className="rounded-xl bg-white flex items-center justify-center hover:bg-patron-card-background hover:text-white duration-150 transition-all h-8 w-8"
                    >
                        <FacebookIcon />
                    </a>



                </div>


            </div>
        </header>
    )
}