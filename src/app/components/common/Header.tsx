"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    const lenis = (window as any).lenis;

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);


  return (
    <header
      className={`header w-full flex justify-between items-center border-black ${pathname !== "/" ? "no-filter" : ""}`}
      
    >
      <a href="/" className="flex flex-col w-[183px] h-14 items-start gap-2.5 relative bg-[#ffffff1a] rounded-xl">
        <div className="relative w-full h-full object-contain">
          <Image src="/logo.svg" alt="Logo" width={149.76} height={28} className="" />
          <Image src="/logo_black.svg" alt="Logo" width={149.76} height={28} className="icon_dark" />
        </div>
      </a>

      <nav
        className="relative h-[56px] pr-[6px] pl-[36px] text-[15px] tracking-[0] leading-[21px] bg-[#ffffff1a] rounded-xl absolute flex items-center gap-10"
        role="navigation"
        aria-label="Main navigation"
      >
        <ul className="flex items-center gap-10 rounded-[8px]">
            <li>
              <TransitionLink
                href="/company"
                className="relative w-fit mt-[-1px] font-medium text-white whitespace-nowrap no-underline hover:opacity-80 transition-opacity"
              >COMPANY
              </TransitionLink>
            </li>
            <li>
              <span className="relative w-fit mt-[-1px] font-medium text-white whitespace-nowrap no-underline hover:opacity-80 transition-opacity">SERVICES</span>
              <div className="depth_2">
                <TransitionLink
                  href="/services"
                  className="relative w-fit mt-[-1px] font-medium text-white whitespace-nowrap no-underline hover:opacity-80 transition-opacity"
                >SERVICE 01
                </TransitionLink>
                <TransitionLink
                  href="/services-2"
                  className="relative w-fit mt-[-1px] font-medium text-white whitespace-nowrap no-underline hover:opacity-80 transition-opacity"
                >SERVICE 02
                </TransitionLink>
              </div>
              
            </li>
            <li>
              <TransitionLink
                href="/newsroom"
                className="relative w-fit mt-[-1px] font-medium text-white whitespace-nowrap no-underline hover:opacity-80 transition-opacity"
              >NEWSROOM
              </TransitionLink>
            </li>
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
              <a
                href="/"
              >
                Home
              </a>
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
          <div className="icon_w">
            <a href=""><img src="/icon_instagram.svg" alt="" /></a>
            <a href=""><img src="/icon_youtube.svg" alt="" /></a>
          </div>
        </div>
      </div>
    </header>
  );
}