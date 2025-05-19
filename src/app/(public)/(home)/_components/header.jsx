import {
  BsWhatsapp as WhatsappIcon,
  BsEnvelope as MailOutlineIcon,
} from "react-icons/bs";
import { BiLogoFacebook as FacebookIcon } from "react-icons/bi";
import { BiLogoInstagram as InstagramIcon } from "react-icons/bi";
import { FaXTwitter as XIcon } from "react-icons/fa6";
import { AiOutlineYoutube as YoutubeIcon } from "react-icons/ai";
import { getBasicDetails } from "@/server/get-basic-details";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export async function Header() {
  const basicDetails = await getBasicDetails();
  
  return (
    <header className="w-full z-20 top-0 left-0 p-2 bg-primary text-on-primary px-2">
      <div className="max-w-7xl w-full flex justify-between items-center mx-auto px-4">
        <div className="flex w-full text-xs md:text-base md:w-max flex-wrap justify-between gap-8 text-white">
          <Link
            target="_blank"
            rel="noopener"
            href={"mailto:" + basicDetails.contact_email}
            className="space-x-1 hover:underline"
          >
            <MailOutlineIcon className="inline text-xl" />
            {/* <span className="hidden min-[400px]:inline">
              {/* info@guptvrindavandham.org
            </span> */}
          </Link>

          <Link
            target="_blank"
            rel="noopener"
            href={"https://wa.me/" + basicDetails.whatsapp_number}
            className="space-x-1 hover:underline"
          >
            <WhatsappIcon className="inline mr-2 text-xl" />
            <span>{basicDetails.phone_number}</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4 text-lg">
          <SocialLink href={basicDetails.socials.youtube}>
            <YoutubeIcon />
          </SocialLink>

          <SocialLink href={basicDetails.socials.instagram}>
            <InstagramIcon />
          </SocialLink>

          <SocialLink href={basicDetails.socials.twitter}>
            <XIcon />
          </SocialLink>

          <SocialLink href={basicDetails.socials.facebook}>
            <FacebookIcon />
          </SocialLink>
        </div>
      </div>
    </header>
  );
}

function SocialLink({ href = "#", children }) {
  return (
    <Button
      size="social"
      asChild
      className="p-0 border-on-primary/40 border flex items-center justify-center text-white hover:bg-on-primary hover:text-primary hover:bg-white duration-150 transition-all h-8 w-8 text-lg"
    >
      <Link href={href} target="_blank" rel="noopener">
        {children}
      </Link>
    </Button>
  );
}