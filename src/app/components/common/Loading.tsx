"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./loading.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Loading() {
  const pathname = usePathname();
  const isMain = pathname === "/";

  const [isLoading, setIsLoading] = useState(false);
  const loadingRunId = useRef(0);

  const loadingRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMain) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    const currentRunId = ++loadingRunId.current;

    setIsLoading(true);

    if (loadingRef.current && logoRef.current) {
      gsap.killTweensOf([loadingRef.current, logoRef.current]);

      gsap.set(loadingRef.current, {
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
      });

      // 1번 상태
      gsap.set(logoRef.current, {
        transformPerspective: 600,
        rotationX: -89,
        yPercent: 90,
        z: -100,

        transformOrigin: "50% 50%",
      });

      gsap.timeline()
        .to(loadingRef.current, {
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
        })
        // 2번 상태
        .to(logoRef.current, {
          rotationX: 0,
          yPercent: 0,
          z: 0,
          duration: 2,
          ease: "power3.out",
        }, "-=0.05");
    }

    const waitForAssets = async () => {
      const images = Array.from(document.images);
      const videos = Array.from(document.querySelectorAll("video"));

      const imagePromises = images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        });
      });

      const videoPromises = videos.map((video) => {
        if (video.readyState >= 3) return Promise.resolve();
        return new Promise<void>((resolve) => {
          video.addEventListener("loadeddata", () => resolve(), { once: true });
          video.addEventListener("error", () => resolve(), { once: true });
        });
      });

      await Promise.all([...imagePromises, ...videoPromises]);

      if (cancelled || loadingRunId.current !== currentRunId) return;

      setTimeout(() => {
        if (cancelled || loadingRunId.current !== currentRunId) return;
        if (!loadingRef.current || !logoRef.current) return;

        gsap.timeline({
          onComplete: () => {
            if (cancelled || loadingRunId.current !== currentRunId) return;
            setIsLoading(false);
            window.dispatchEvent(new CustomEvent("main-loading-finished"));
            setTimeout(() => ScrollTrigger.refresh(), 100);
          },
        })
          // 3번 상태
          .to(logoRef.current, {
            rotationX: 83,
            yPercent: -55,
            z: -10,
            duration: 0.8,
            ease: "power3.inOut",
          })
          .to(loadingRef.current, {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 1.2,
            ease: "power3.inOut",
          }, "<")
      }, 2000);
    };

    if (document.readyState === "complete") {
      waitForAssets();
    } else {
      window.addEventListener("load", waitForAssets, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", waitForAssets);
      if (loadingRef.current) gsap.killTweensOf(loadingRef.current);
      if (logoRef.current) gsap.killTweensOf(logoRef.current);
    };
  }, [pathname, isMain]);

  return (
    <div
      ref={loadingRef}
      className={`fixed inset-0 z-[9999] pointer-events-none ${
        isLoading ? "loading-now" : ""
      } loading_w`}
    >
      <div ref={logoRef} className="loading-logo">
        <img src="/loading-logo.svg" alt="Loading Logo" style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}