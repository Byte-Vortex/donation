"use client";

import React from "react";
import {
  BsWhatsapp as WhatsappIcon,
  BsEnvelope as MailIcon,
} from "react-icons/bs";
import { BsPlus as PlusIcon } from "react-icons/bs";
import { FaCheckCircle as CheckmarkIcon } from "react-icons/fa";
import { BiLogoFacebook as FacebookIcon } from "react-icons/bi";
import { BiLogoInstagram as InstagramIcon } from "react-icons/bi";
import { FaXTwitter as XIcon } from "react-icons/fa6";
import { AiOutlineYoutube as YoutubeIcon } from "react-icons/ai";
import Logo from "../../assets/images/gupt-vrindavan-dham-logo.png";
import { useState } from "react";
import { clsx } from "clsx";
import { Image } from "@/components/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import gridEffect from '@/assets/grideffect.png'

export function FooterClient({ basicDetails }) {
  const [footerState, setFooterState] = useState(() => ({
    timing: false,
    activities: false,
    about: false,
    contact: false,
  }));

  const homepageUrl = "https://guptvrindavandham.org";

  function openSection(section_name) {
    setFooterState((oldState) => {
      return {
        ...oldState,
        [section_name]: !oldState[section_name],
      };
    });
  }

  return (
    <footer className="font-medium gap-5 w-full text-gray-300 bg-background-dark pb-6 min-h-fit">
      <div className=" flex flex-col justify-center items-center py-10 gap-5 mx-auto px-4">
        <div className="bg-white max-w-7xl w-full h-fit rounded-xl flex flex-col md:flex-row justify-between overflow-hidden">
          <div className="flex-[0.45] p-5 flex flex-col gap-2">
            <h4 className="text-foreground">Donate for construction of Radha Krishna Temple</h4>
            <p className="text-foreground hidden sm:flex">Donate for construction of radha krishna temple</p>
          </div>
          <div className="flex-[0.45] relative min-h-32 w-full items-center justify-center bg-white dark:bg-black">
            {/* Grid pattern */}
            <div
              className={cn(
                "absolute inset-0",
                "[background-size:40px_40px]",
                "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
              )}
            />
            {/* <div className="absolute inset-0 h-full w-full">
              <Image
              src={gridEffect}
              width={100}
              height={100}
              className="object-cover h-full w-full"
               />
            </div> */}
            {/* Radial mask */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

            {/* Button (on top) */}
            <div className="relative z-10 md:right-20 flex items-center justify-center md:justify-end h-full w-full p-4">
              <button className="px-6 py-2 rounded-lg text-base bg-black text-white hover:bg-black/90 transition-shadow duration-300 shadow-[inset_0_0_12px_white] hover:shadow-[inset_0_0_10px_white]">
                Donate Now
              </button>
            </div>
          </div>
        </div>

        <a
          href="https://guptvrindavandham.org/"
          className="hover:brightness-75 flex items-center justify-center"
        >
          <Image
            loadingAnimation={false}
            className="h-auto max-w-[67px] sm:max-w-[110px] m-auto flex-grow"
            src={Logo}
            alt="HKM Jaipur"
          />
        </a>

        <div className="space-y-4 text-center w-full max-w-lg flex flex-col justify-center items-center">
          {/* <p className="">{basicDetails.address}</p> */}
          <div className="flex w-full justify-between md:justify-center md:-ml-14 md:gap-10">
            <Link href={'/c/square-feet-seva?utm_source=hkcc_card&utm_medium=dmt'} className="hover:underline">Square Feet Seva</Link>
            <Link href={'/anna-daan-seva?utm_source=charitable_card&utm_medium=dmt'} className="hover:underline">Anna Daan Seva</Link>
            <Link href={'/gau-seva?utm_source=charitable_card&utm_medium=dmt'} className="hover:underline">Gau Seva</Link>
          </div>

          <div className="flex items-center space-x-4 text-lg max-w-xs mx-auto text-foreground">
            <a
              href={basicDetails.socials.youtube}
              target="_blank"
              className="rounded-xl bg-white flex items-center justify-center hover:bg-primary hover:text-white duration-150 transition-all h-8 w-8"
            >
              <YoutubeIcon />
            </a>
            <a
              href={basicDetails.socials.instagram}
              target="_blank"
              className="rounded-xl bg-white flex items-center justify-center hover:bg-primary hover:text-white duration-150 transition-all h-8 w-8"
            >
              <InstagramIcon />
            </a>
            <a
              href={basicDetails.socials.twitter}
              target="_blank"
              className="rounded-xl bg-white flex items-center justify-center hover:bg-primary hover:text-white duration-150 transition-all h-8 w-8"
            >
              <XIcon />
            </a>
            <a
              href={basicDetails.socials.facebook}
              target="_blank"
              className="rounded-xl bg-white flex items-center justify-center hover:bg-primary hover:text-white duration-150 transition-all h-8 w-8"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>
      </div>
      {/* Copy Right Section */}
      <div
        className="max-w-7xl p-4 text-sm mx-auto flex flex-col justify-between py-5 border-t
                    border-zinc-300 sm:flex-row gap-4 text-zinc-500"
      >
        <p>
          ©{new Date().getFullYear()}{" "}
          <a
            target="_blank"
            className="text-primary hover:underline"
            href="https://guptvrindavandham.org/"
          >
            Hare Krishna Movement Jaipur.
          </a>{" "}
          All rights Reserved.
        </p>

        <div className="text-zinc">
          <a
            href="https://guptvrindavandham.org/terms-and-conditions/"
            className="hover:text-white hover:underline"
          >
            Terms of Use
          </a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a
            href="https://guptvrindavandham.org/privacy-policy/"
            className="hover:text-white hover:underline"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}