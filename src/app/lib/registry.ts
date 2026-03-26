import { gsap, customEases } from "./index";

export type TransitionFn = (
  currentContainer: HTMLElement,
  nextContainer: HTMLElement,
  offsetY?: number
) => gsap.core.Timeline;

export function defaultTransition(
  currentContainer: HTMLElement,
  nextContainer: HTMLElement,
  offsetY: number = 0
): gsap.core.Timeline {
  gsap.set(nextContainer, {
    clipPath: "inset(0% 0% 0% 0%)",
    y:"100vh",
    opacity: 1,
    position: "fixed",
    top: `${offsetY}px`,
    left: 0,
    width: "100%",
    height: "100vh",
    zIndex: 10,
  });

  const tl = gsap.timeline();

  tl.to(
    currentContainer,
    {
      y: "-300px",
      opacity: 1,
      scale: 0.8,
      duration: 1.2,
      force3D: true,
      ease: customEases.pageTransition,
    },
    0
  ).to(
    nextContainer,
    {
      y:"000px",
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.2,
      force3D: true,
      ease: customEases.pageTransition,
    },
    0
  );

  return tl;
}

export function getTransition(): TransitionFn {
  return defaultTransition;
}