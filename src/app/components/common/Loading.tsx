"use client";

import { usePathname, useSearchParams  } from "next/navigation";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./loading.scss"

gsap.registerPlugin(ScrollTrigger);

export default function Loading() {

  

  


  const pathname = usePathname(); // ← 현재 경로
  const searchParams = useSearchParams();

  const isMain = pathname === "/"; // ← 메인 체크
  //const isMain = pathname === "/test"

  const [isLoading, setIsLoading] = useState(isMain);
  //const [isLoading, setIsLoading] = useState(true);


  /*useEffect(() => {
    const lenis = (window as any).lenis;

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, searchParams]);
*/
  useEffect(() => {

    let cancelled = false;

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
      if (cancelled) return;

      setTimeout(() => {
        if (cancelled) return;
        setIsLoading(false);
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
  }, []);



  return (

      <div className={`fixed bg-black inset-0 z-[9999] text-black transition-all duration-500 ${isLoading ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"} loading_w`}>
        {/*<div className="flex h-full w-full items-center justify-center">
          <div className="text-center">
            <div className="mb-3 text-xs tracking-[0.35em]">LOADING</div>
            <div className="h-[2px] w-36 overflow-hidden bg-black/10">
              <div className={`h-full bg-black transition-all duration-700 ${isLoading ? "w-20" : "w-full"}`} />
            </div>
          </div>
        </div>*/}
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
