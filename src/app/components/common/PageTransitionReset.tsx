"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageTransitionReset() {
  const pathname = usePathname();



  useEffect(() => {
    const page = document.querySelector(".page-content");
    if (!page) return;

    page.classList.remove("page-leave");

    requestAnimationFrame(() => {
      page.classList.add("page-enter");
    });

    const timer = setTimeout(() => {
      page.classList.remove("page-enter");
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}