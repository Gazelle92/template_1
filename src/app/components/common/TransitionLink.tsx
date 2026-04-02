"use client";

import Link, { LinkProps } from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

type TransitionLinkProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
  leaveDuration?: number;
  activeResetDelay?: number;
};

export default function TransitionLink({
  href,
  children,
  className,
  leaveDuration = 500,
  activeResetDelay = 550,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const nextHref = typeof href === "string" ? href : href.toString();
    if (nextHref === pathname) return;

    document.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });

    const page = document.querySelector(".page-content");
    if (!page) {
      setTimeout(() => {
        router.push(nextHref);
      }, activeResetDelay + leaveDuration);
      return;
    }

    document.body.classList.remove("page-enter");
    document.body.classList.remove("page-leave");

    setTimeout(() => {
      document.body.classList.add("page-leave");

      setTimeout(() => {
        router.push(nextHref);
        window.scrollTo(0, 0);
      }, leaveDuration);
    }, activeResetDelay);
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}