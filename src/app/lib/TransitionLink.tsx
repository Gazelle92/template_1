"use client";

import { MouseEvent } from "react";
import Link from "next/link";
import { usePageTransition } from "./PageTransitionProvider";

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export default function TransitionLink({ href, className, children }: Props) {
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
    navigate(href);
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}