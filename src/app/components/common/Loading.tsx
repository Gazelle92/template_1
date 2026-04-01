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

  useEffect(() => {
    if (!isMain) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    const currentRunId = ++loadingRunId.current;

    setIsLoading(true);

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

        setIsLoading(false);

        window.dispatchEvent(new CustomEvent("main-loading-finished"));

        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      }, 500);
    };

    if (document.readyState === "complete") {
      waitForAssets();
    } else {
      window.addEventListener("load", waitForAssets, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", waitForAssets);
    };
  }, [pathname, isMain]);

  return (
    <div
      className={`fixed bg-black inset-0 z-[9999] text-black transition-all duration-500 ${
        isLoading ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      } loading_w`}
    >
      <div id="load">
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
      </div>
    </div>
  );
}