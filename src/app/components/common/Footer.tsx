"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/contact") return null;

  return (
    <section className="footer">
      <div className="inner">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/company">Company</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/projects">Projects</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
        <div className="info_w">
          <h4>Email</h4>
          <span className="email">contact@company.com</span>
          <div className="info_el">
            <h4>Phone</h4>
            <span>+82 000 000 0000</span>
          </div>
          <div className="info_el">
            <h4>Address</h4>
            <span>1F, 00 Sample, Mirae-gu, Seoul Republic of Korea</span>
          </div>
        </div>
        <div className="icon_w">
          <a href=""><img src="/icon_instagram.svg" alt="" /></a>
          <a href=""><img src="/icon_youtube.svg" alt="" /></a>
        </div>
      </div>
      <span className="copyright">Company name © 2026</span>
    </section>
  );
}