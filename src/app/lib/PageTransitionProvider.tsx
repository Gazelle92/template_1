"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

type TransitionContextType = {
  navigate: (href: string) => void;
  isTransitioning: boolean;
};

const TransitionContext = createContext<TransitionContextType | null>(null);

export function usePageTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used inside PageTransitionProvider");
  }
  return context;
}

export default function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [isTransitioning, setIsTransitioning] = useState(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const oldLayerRef = useRef<HTMLDivElement | null>(null);
  const pendingHrefRef = useRef<string | null>(null);
  const prevPathnameRef = useRef(pathname);

  const createOldLayer = useCallback(() => {
    const current = document.getElementById("page-content");
    if (!current) return null;

    const rect = current.getBoundingClientRect();
    const clone = current.cloneNode(true) as HTMLDivElement;

    clone.style.position = "fixed";
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.margin = "0";
    clone.style.pointerEvents = "none";
    clone.style.zIndex = "100";
    clone.style.transform = "translateY(0%)";
    clone.style.willChange = "transform";
    clone.style.background = getComputedStyle(document.body).backgroundColor || "#fff";
    clone.setAttribute("data-old-layer", "true");

    return clone;
  }, []);

  const navigate = useCallback(
    (href: string) => {
      if (isTransitioning) return;
      if (href === pathname) return;

      const overlay = overlayRef.current;
      if (!overlay) {
        router.push(href);
        return;
      }

      const oldLayer = createOldLayer();
      if (!oldLayer) {
        router.push(href);
        return;
      }

      overlay.innerHTML = "";
      overlay.appendChild(oldLayer);
      oldLayerRef.current = oldLayer;
      pendingHrefRef.current = href;

      setIsTransitioning(true);
      document.documentElement.classList.add("is-page-transitioning");

      router.push(href);
    },
    [createOldLayer, isTransitioning, pathname, router]
  );

  useEffect(() => {
    if (!isTransitioning) {
      prevPathnameRef.current = pathname;
      return;
    }

    if (pathname === prevPathnameRef.current) return;

    const overlay = overlayRef.current;
    const oldLayer = oldLayerRef.current;
    const newLayer = document.getElementById("page-content");

    if (!overlay || !oldLayer || !newLayer) {
      setIsTransitioning(false);
      document.documentElement.classList.remove("is-page-transitioning");
      prevPathnameRef.current = pathname;
      return;
    }

    gsap.killTweensOf(oldLayer);
    gsap.killTweensOf(newLayer);

    const vh = document.documentElement.clientHeight;

    gsap.set(newLayer, {
      y: vh,
      position: "relative",
      zIndex: 10,
      willChange: "transform",
    });

    const tl = gsap.timeline({
      onComplete: () => {
        oldLayer.remove();
        overlay.innerHTML = "";
        setIsTransitioning(false);
      },
    });

    // ❗ 동시에 실행 (둘 다 0초 시작)
    tl.to(
      oldLayer,
      {
        y: -vh,
        duration: 0.8,
        ease: "power3.inOut",
      },
      0
    ).to(
      newLayer,
      {
        y: 0,
        duration: 0.8,
        ease: "power3.inOut",
      },
      0
    );

    return () => {
      tl.kill();
    };
  }, [pathname, isTransitioning]);

  return (
    <TransitionContext.Provider value={{ navigate, isTransitioning }}>
      {children}
      <div
        ref={overlayRef}
        id="page-transition-overlay"
        style={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 9,
        }}
      />
    </TransitionContext.Provider>
  );
}