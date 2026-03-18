"use client";

import { useEffect } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function QuoteAnimationProvider() {
  useEffect(() => {
    const quotes = document.querySelectorAll<HTMLElement>(".quote");
    const splits: SplitType[] = [];

    quotes.forEach((el) => {
      if (el.dataset.animated === "true") return;

      const split = new SplitType(el, { types: "words" });
      const words = split.words;

      if (!words || words.length === 0) return;

      splits.push(split);

      words.forEach((word) => {
        word.style.display = "inline-block";
      });

      // 초기 상태
      gsap.set(words, {
        y: 10,
        opacity: 0,
      });
      let enterTween: gsap.core.Tween | null = null;


      ScrollTrigger.create({
        trigger: el,
        start: "top 95%",

        onEnter: () => {
          // 기존 애니메이션 있으면 제거
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
          // 등장 애니메이션 중이면 취소
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

      el.dataset.animated = "true";
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      splits.forEach((split) => split.revert());
    };
  }, []);


  useEffect(() => {
    const ani = document.querySelectorAll<HTMLElement>(".ani");

    ani.forEach((el) => {
      if (el.dataset.animated === "true") return;

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

      el.dataset.animated = "true";
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}