"use client";

import { useEffect } from "react";

export default function GlobalFloating() {
  useEffect(() => {
    const floating = () => {
      const floatWrap = document.querySelector(".float-wrap") as HTMLElement | null;
      const floatEl = document.querySelector(".float-el") as HTMLElement | null;

      if (!floatWrap || !floatEl) return;

      const scrollTop = window.scrollY;
      const wrapTop = floatWrap.getBoundingClientRect().top + window.scrollY;

      if (scrollTop >= wrapTop) {
        floatEl.classList.add("floating");
      } else {
        floatEl.classList.remove("floating");
      }

      const floatBottom = wrapTop + floatWrap.offsetHeight - window.innerHeight;

      if (scrollTop > floatBottom) {
        floatEl.classList.add("float-bottom");
      } else {
        floatEl.classList.remove("float-bottom");
      }
      console.log("scrolltop",scrollTop, wrapTop, "floatbottom", floatBottom);
    };

    floating();
    window.addEventListener("scroll", floating);
    window.addEventListener("resize", floating);

    return () => {
      window.removeEventListener("scroll", floating);
      window.removeEventListener("resize", floating);
    };
  }, []);

  return null;
}
