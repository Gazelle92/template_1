"use client";

import { useEffect } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function QuoteAnimationProvider() {
  const pathname = usePathname();

  useEffect(() => {
    let timer: number | undefined;

    const runQuoteAnimation = () => {
      timer = window.setTimeout(() => {
        const quotes = document.querySelectorAll<HTMLElement>(".quote");
        const splits: SplitType[] = [];

        quotes.forEach((el) => {
          if (el.dataset.quoteAnimated === "true") return;

          const split = new SplitType(el, { types: "words" });
          const words = split.words;

          if (!words || words.length === 0) return;

          splits.push(split);

          words.forEach((word) => {
            word.style.display = "inline-block";
          });

          gsap.set(words, {
            y: 10,
            opacity: 0,
          });

          let enterTween: gsap.core.Tween | null = null;

          ScrollTrigger.create({
            trigger: el,
            start: "top 95%",

            onEnter: () => {
              enterTween?.kill();
              el.classList.add("active");

              enterTween = gsap.to(words, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                delay: 0.2,
                stagger: 0.01,
                ease: "power3.out",
              });
            },

            onLeaveBack: () => {
              enterTween?.kill();
              el.classList.remove("active");

              gsap.to([...words].reverse(), {
                y: 10,
                opacity: 0,
                duration: 0.15,
                stagger: 0.01,
                ease: "power2.in",
              });
            },
          });

          el.dataset.quoteAnimated = "true";
        });

        ScrollTrigger.refresh();
        (window as any).__quoteSplits = splits;
      }, 500);
    };

    const handleMainLoadingFinished = () => {
      runQuoteAnimation();
    };

    if (pathname === "/") {
      window.addEventListener("main-loading-finished", handleMainLoadingFinished, { once: true });
    } else {
      runQuoteAnimation();
    }

    return () => {
      window.clearTimeout(timer);

      window.removeEventListener("main-loading-finished", handleMainLoadingFinished);

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      const savedSplits = (window as any).__quoteSplits as SplitType[] | undefined;
      savedSplits?.forEach((split) => split.revert());

      document.querySelectorAll<HTMLElement>(".quote").forEach((el) => {
        delete el.dataset.quoteAnimated;
      });
    };
  }, [pathname]);

  useEffect(() => {
    let timer: number | undefined;

    const runAniAnimation = () => {
      timer = window.setTimeout(() => {
        ScrollTrigger.refresh();
        const ani = document.querySelectorAll<HTMLElement>(".ani");

        ani.forEach((el) => {
          if (el.dataset.aniAnimated === "true") return;

          ScrollTrigger.create({
            trigger: el,
            start: "top 90%",

            onEnter: () => {
              el.classList.add("active");
            },

            /*onLeaveBack: () => {
              el.classList.remove("active");
            },*/
          });

          el.dataset.aniAnimated = "true";
        });

        ScrollTrigger.refresh();
      }, 1000);
    };

    const handleMainLoadingFinished = () => {
      runAniAnimation();
    };

    if (pathname === "/") {
      window.addEventListener("main-loading-finished", handleMainLoadingFinished, { once: true });
    } else {
      runAniAnimation();
    }

    return () => {
      window.clearTimeout(timer);

      window.removeEventListener("main-loading-finished", handleMainLoadingFinished);

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      document.querySelectorAll<HTMLElement>(".ani").forEach((el) => {
        delete el.dataset.aniAnimated;
      });
    };
  }, [pathname]);

  return null;
}