"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function GlobalSmoother() {
  useEffect(() => {
    /*gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    ScrollSmoother.create({
      smooth: 1,
      effects: true,
    });*/
  }, []);

  return null;
}
