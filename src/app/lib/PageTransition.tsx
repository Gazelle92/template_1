"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { getTransition } from "./registry";

type Props = {
  namespace: string;
  children: ReactNode;
};

export default function PageTransition({ namespace, children }: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const liveRef = useRef<HTMLDivElement | null>(null);
  const exitingHostRef = useRef<HTMLDivElement | null>(null);

  const prevNamespaceRef = useRef(namespace);
  const stableCloneRef = useRef<HTMLElement | null>(null);
  const animatingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const updateStableClone = () => {
    if (!liveRef.current || animatingRef.current) return;
    stableCloneRef.current = liveRef.current.cloneNode(true) as HTMLElement;
  };

  useLayoutEffect(() => {
    if (!liveRef.current) return;

    if (namespace === prevNamespaceRef.current) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        updateStableClone();
      });
      return;
    }

    if (animatingRef.current) return;
    if (!exitingHostRef.current || !liveRef.current) return;

    const previousClone = stableCloneRef.current
      ? (stableCloneRef.current.cloneNode(true) as HTMLElement)
      : null;

    if (!previousClone) {
      prevNamespaceRef.current = namespace;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        updateStableClone();
      });
      return;
    }

    animatingRef.current = true;

    const wrapperEl = wrapperRef.current;
    const exitingHostEl = exitingHostRef.current;
    const nextEl = liveRef.current;
    const currentEl = previousClone;

    exitingHostEl.innerHTML = "";
    exitingHostEl.appendChild(currentEl);

    const finish = () => {
      exitingHostEl.innerHTML = "";

      gsap.set(nextEl, {
        clearProps:
          "clipPath,position,top,left,width,height,zIndex,opacity,willChange,background",
      });

      document.body.style.overflow = "";
      prevNamespaceRef.current = namespace;
      animatingRef.current = false;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        updateStableClone();
      });
    };

    const run = async () => {
      //document.body.style.overflow = "hidden";

      //const scrollY = window.scrollY || document.documentElement.scrollTop || 0;

      const images = Array.from(
        nextEl.querySelectorAll("img")
      ) as HTMLImageElement[];

      if (images.length > 0) {
        await Promise.all(
          images.map(
            (img) =>
              new Promise<void>((resolve) => {
                if (img.complete) return resolve();
                img.onload = () => resolve();
                img.onerror = () => resolve();
              })
          )
        );
      }

      if (wrapperEl) {
        gsap.set(wrapperEl, {
          //overflow: "hidden",
          position: "relative",
        });
      }

      const lenis = (window as any).lenis;
      const scrollY = lenis ? lenis.scroll : window.scrollY || 0;

      const transitionFn = getTransition();
      const tl = transitionFn(currentEl, nextEl, -scrollY);

      tl.eventCallback("onComplete", finish);
    };

    run();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [namespace, children]);

  useLayoutEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      data-transition="wrapper"
      style={{
        position: "relative",
        width: "100%",
        //overflow: "hidden",
      }}
    >
      <div
        ref={exitingHostRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          zIndex: 8,
          pointerEvents: "none",
        }}
      />

      <div
        ref={liveRef}
        data-transition="live"
        data-namespace={namespace}
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          background: "#fff",
          zIndex: 97,
        }}
      >
        {children}
      </div>
    </div>
  );
}