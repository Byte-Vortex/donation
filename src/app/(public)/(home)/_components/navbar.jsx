"use client";

import LogoPurple from "@/assets/images/gupt-vrindavan-dham-logo-purple.png";
import LogoWhite from "@/assets/images/gupt-vrindavan-dham-logo.png";
import Link from "next/link";
import {
  Menubar,
  MenubarMenu,
  MenubarContent,
  MenubarItem,
  MenubarTrigger,
} from "./menubar";
import allNavLinks from "./all-nav-links";
import { Button } from "@/components/ui/button";
import * as PhoneMenubar from "./phone-menubar";
import { ActiveLink } from "@/components/misc/active-link";
import clsx from "clsx";
import { Image } from "@/components/image";
import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsScrolled(scrollPosition > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  })
  return (
    <>
      <div id="navbar" className={`sticky left-0 h-14 text-sm z-40 px-3 flex items-center transform ease-in-out duration-1000  justify-center bg-background ${isScrolled ? "top-1.5 mx-3 lg:mx-16 transition-all gap-10 backdrop-blur-md rounded-xl ease-in-out duration-700 outline-gray-300 outline outline-1  shadow-md" : "max-w-[100vw] top-0 lg:px-[7vw] w-full transition-[top] ease-in-out duration-700"}`}>
        <div className={`flex items-center justify-between h-full font-medium gap-10 w-full`}>
          <Link href={BASE_URL} className="">
            <Image
              loadingAnimation={false}
              className="h-auto max-w-[67px] m:max-w-none w-auto sm:max-h-[40px]"
              width={87}
              height={52}
              src={LogoWhite}
              alt="Logo"
            />
          </Link>
          <Menubar className="hidden min-[900px]:flex gap-10 whitespace-nowrap py-1 h-full justify-center items-center text-sm flex-grow select-none font-semibold">
            {allNavLinks.desktop.map((item, index) => {
              if (!item.children)
                return (
                  <ActiveLink
                    key={index}
                    href={
                      item.title.toLowerCase() === "festivals"
                        ? `${process.env.NEXT_PUBLIC_BASE_URL}${item.to}`
                        : item.to
                    }
                    className={(isActive) =>
                      clsx(
                        "hover:text-primary hover:underline",
                        isActive && "text-primary"
                      )
                    }
                  >
                    {item.title}
                  </ActiveLink>
                );

              return (
                <MenubarMenu key={index}>
                  <MenubarTrigger isActive={false}>{item.title}</MenubarTrigger>

                  <MenubarContent className="grid grid-cols-1 bg-surface text-on-surface font-semibold">
                    {item.children.map((child, index) => {
                      return (
                        <MenubarItem asChild isActive={false} key={index}>
                          <ActiveLink
                            href={`${process.env.NEXT_PUBLIC_BASE_URL}${child.to}`}
                          >
                            {child.title}
                          </ActiveLink>
                        </MenubarItem>
                      );
                    })}
                  </MenubarContent>
                </MenubarMenu>
              );
            })}
          </Menubar>
        </div>
      </div>

      <div id='mobileNavbar' className="fixed bottom-0 z-50 shadow-md min-[900px]:hidden w-full bg-surface text-on-surface h-16 flex items-center justify-around text-xs border-t border-outline">
        {allNavLinks.mobile.map((item, index) => {
          if (!item.children)
            return (
              <PhoneMenubar.Link
                key={index}
                icon={<div className="text-xl">{item.icon}</div>}
                title={item.title}
                to={item.to}
              />
            );

          return (
            <PhoneMenubar.Root key={index}>
              <PhoneMenubar.Trigger
                icon={<div className="text-xl">{item.icon}</div>}
                title={item.title}
              />

              <PhoneMenubar.Content>
                {item.children.map((child, index) => {
                  if (!child.children?.length) {
                    return (
                      <PhoneMenubar.LinkItem
                        key={index}
                        to={`${process.env.NEXT_PUBLIC_BASE_URL}${child.to}`}
                        title={child.title}
                      />
                    );
                  }

                  return (
                    <PhoneMenubar.Accordion key={index} type="single">
                      <PhoneMenubar.AccordionItem value={child.title}>
                        <PhoneMenubar.AccordionTrigger>
                          {child.title}
                        </PhoneMenubar.AccordionTrigger>

                        <PhoneMenubar.AccordionContent>
                          {child.children.map((child, index) => (
                            <PhoneMenubar.LinkItem
                              key={index}
                              to={`${process.env.NEXT_PUBLIC_BASE_URL}${child.to}`}
                              title={child.title}
                            />
                          ))}
                        </PhoneMenubar.AccordionContent>
                      </PhoneMenubar.AccordionItem>
                    </PhoneMenubar.Accordion>
                  );
                })}
              </PhoneMenubar.Content>
            </PhoneMenubar.Root>
          );
        })}
      </div>
    </>
  );
}
