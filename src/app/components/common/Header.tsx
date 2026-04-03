"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

import TransitionLink from "../common/TransitionLink";

const navigationItems = [
  { label: "COMPANY", href: "/company" },
  { label: "SERVICES", href: "/services" },
  { label: "NEWSROOM", href: "/newsroom" },
];

export default function Header() {
  const pathname = usePathname();
  const isMain = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);


  return (
    <header
      className={`header w-full flex justify-between items-center border-black ${pathname !== "/" ? "no-filter" : ""}`}
      
    >
      <TransitionLink
        href="/"
        className="flex flex-col w-[183px] h-14 items-start gap-2.5 relative bg-[#ffffff1a] rounded-xl"
      >
        <div className="relative">
          <Image src="/logo.svg" alt="Logo" width={149.76} height={28} className="w-full h-full object-contain" />
        </div>
      </TransitionLink>

      <nav
        className="relative h-[56px] pr-[6px] pl-[36px] text-[15px] tracking-[0] leading-[21px] bg-[#ffffff1a] rounded-xl absolute flex items-center gap-10"
        role="navigation"
        aria-label="Main navigation"
      >
        <ul className="flex items-center gap-10 rounded-[8px]">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <TransitionLink
                href={item.href}
                className="relative w-fit mt-[-1px] font-medium text-white whitespace-nowrap no-underline hover:opacity-80 transition-opacity"
              >
                {item.label}
              </TransitionLink>
            </li>
          ))}
        </ul>

        <TransitionLink
          href="/contact"
          className="font-medium text-black whitespace-nowrap flex items-center justify-center no-underline bg-[#00FFA1] px-[22px] py-[12px] rounded-[8px]"
        >
          CONTACT
        </TransitionLink>
      </nav>
       <div className={`mob mob_nav ${isOpen ? "active" : ""}`}>
        <div
          className="mob_nav_btn"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className="inner"></div>
        </div>
        <div className="mob_menu_w">
          <ul>
            <li>
              <TransitionLink
                href="/"
              >
                Home
              </TransitionLink>
            </li>
            {navigationItems.map((item, index) => (
              <li key={index}>
                <TransitionLink
                  href={item.href}
                >
                  {item.label}
                </TransitionLink>
              </li>
            ))}
            <li>
              <TransitionLink
                href="/contact"
              >
                CONTACT
              </TransitionLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}