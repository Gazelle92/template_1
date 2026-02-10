"use client";

import { useEffect } from "react";

export default function GlobalFloating() {
  useEffect(() => {
    const floating = () => {
      const wraps = document.querySelectorAll<HTMLElement>(".float-wrap");
      if (!wraps.length) return;

      wraps.forEach((wrap) => {
        const floatEl = wrap.querySelector<HTMLElement>(".float-el");
        if (!floatEl) return;

        const scrollTop = window.scrollY;
        const wrapTop = wrap.getBoundingClientRect().top + window.scrollY;

        if (scrollTop >= wrapTop) floatEl.classList.add("floating");
        else floatEl.classList.remove("floating");

        const floatBottom = wrapTop + wrap.offsetHeight - window.innerHeight;

        if (scrollTop > floatBottom) floatEl.classList.add("float-bottom");
        else floatEl.classList.remove("float-bottom");
      });
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
