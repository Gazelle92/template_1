"use client";

import { useEffect } from "react";

export default function Sec2ScrollHeightEvent() {
  useEffect(() => {
    const handleScroll = () => {
      const floatWrap = document.querySelector(".main_sec_2.float-wrap") as HTMLElement | null;
      if (!floatWrap) return;

      const els = floatWrap.querySelectorAll(".sc_el") as NodeListOf<HTMLElement>;
      if (!els.length) return;

      const scrollTop = window.scrollY;
      const wrapTop = floatWrap.getBoundingClientRect().top + window.scrollY;

      const baseHeight = window.innerWidth > 1024 ? 70 : 90;

      const m4top = scrollTop - wrapTop;

      // innerHeight 계산용 함수
      const getInnerHeight = (el: HTMLElement) => {
        const inner = el.querySelector(".sc_el_inner") as HTMLElement | null;
        return inner ? inner.offsetHeight : el.scrollHeight;
      };

      // 너 구조는 .main_4_el_inner 같은게 없으니까
      // 대신 li 내부 전체 높이를 기준으로 잡음
      const innerHeights = Array.from(els).map((el) => el.scrollHeight);

      // max-height 설정
      els.forEach((el, i) => {
        el.style.maxHeight = `${innerHeights[i]}px`;
      });

      // 초기 기본값
      els.forEach((el, i) => {
        el.style.height = `${baseHeight}px`;
      });

      // 맨 첫번째는 wrapTop 위에서는 원래 높이 유지
      if (scrollTop <= wrapTop) {
        els[0].style.height = `${innerHeights[0]}px`;
      }

      // 구간별 height 계산
      if (scrollTop >= wrapTop && scrollTop < wrapTop + innerHeights[1] - baseHeight) {
        els[0].style.height = `${innerHeights[0] - m4top}px`;
        els[1].style.height = `${m4top + baseHeight}px`;
      } 
      else if (
        scrollTop >= wrapTop + innerHeights[1] - baseHeight &&
        scrollTop < wrapTop + innerHeights[1] + innerHeights[2]
      ) {
        els[1].style.height = `${innerHeights[1] * 2 - m4top}px`;
        els[2].style.height = `${m4top - innerHeights[1] + baseHeight}px`;
      } 
      else if (
        scrollTop >= wrapTop + innerHeights[2] - baseHeight
      ) {
        els[2].style.height = `${innerHeights[2] * 3 - m4top}px`;
      }

      // show 클래스 토글
      els.forEach((el) => {
        if (el.offsetHeight <= 200) el.classList.remove("show");
        else el.classList.add("show");
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return null;
}