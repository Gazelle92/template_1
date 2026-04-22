"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

const CursorFollower = () => {
  const [cursorClass, setCursorClass] = useState("");

  useEffect(() => {
    const cursor = document.querySelector(".cursor");

    if (!cursor) return;

    // 🔹 마우스 따라가기
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 🔹 hover 대상 체크 (이벤트 위임)
    const selector = ".video-wrap, .works .work-list-wrap ul li span, a, .back";

    const handleMouseOver = (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest(selector);
    if (!target) return;

    if (target.classList.contains("back")) {
      setCursorClass("hover-back");
    } else if (target.matches("a")) {
      setCursorClass("hover");
    }
  };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(selector);
      if (!target) return;

      setCursorClass("");
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div className={`cursor test ${cursorClass}`}>
      <div className="cursor-inner"></div>
      <span className="cursor-txt-detail">DETAILS</span>
      <span className="cursor-txt-back">BACK</span>
    </div>
  );
};

export default CursorFollower;