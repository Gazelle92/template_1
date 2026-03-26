"use client";

import { usePathname } from "next/navigation";
import PageTransition from "./PageTransition";

export default function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return <PageTransition namespace={pathname}>{children}</PageTransition>;
}