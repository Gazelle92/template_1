"use client";

import Link from "next/link";
import { MouseEvent, ReactNode } from "react";
import { usePageTransition } from "./PageTransitionProvider";

type Props = {
  href: string;
  className?: string;
  children: ReactNode;
  removeHeaderFilter?: boolean; // 👈 추가
};

export default function TransitionLink({
  href,
  className,
  children,
  removeHeaderFilter,
}: Props) {
  const { navigate, isTransitioning } = usePageTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isTransitioning) {
      e.preventDefault();
      return;
    }

    const isModified =
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;

    if (isModified) return;

    e.preventDefault();

    // 👇 여기서 header 제어
    const header = document.querySelector("header");
    if (header) {
      if (removeHeaderFilter) {
        header.classList.remove("no-filter");
      } else {
        header.classList.add("no-filter");
      }
    }

    navigate(href);
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}