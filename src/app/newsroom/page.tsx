"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./newsroom.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Newsroom() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".sym_w > img");
    const startTranslate = 10;

    const handleScroll = () => {
      const vh = window.innerHeight;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = vh / 2;

        let progress = (elementCenter - viewportCenter) / viewportCenter;
        progress = Math.max(-1, Math.min(1, progress));

        const translate = progress * startTranslate;
        el.style.transform = `translateY(${translate}%) scale(calc(1 + (${startTranslate}) * 0.02))`;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);



  return (
    <div className="page_newsroom">
      <section className="list_head">
        <h1>Newsroom</h1>
        <div className="tag_w">
          <div>View ALL</div>
          <div>Company News</div>
          <div>Press Release</div>
          <div>Partnership</div>
        </div>
        
      </section>
      <section className="list_body">
        <ul className="grid_4x4">
          <li>
            <a href="">
              <span className="date">12/24/2026</span>
              <span className="tag tag_1">Company News</span>
              <h4 className="title">차세대 바이오 연구 성과 발표 및 기술 고도화 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="">
              <span className="date">12/15/2026</span>
              <span className="tag tag_2">Press Release</span>
              <h4 className="title">글로벌 시장 진출을 위한 전략적 파트너십 체결</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="">
              <span className="date">11/06/2026</span>
              <span className="tag tag_3">Partnership</span>
              <h4 className="title">미래 바이오 산업 대응을 위한 기술 혁신 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="">
              <span className="date">12/24/2026</span>
              <span className="tag tag_1">Company News</span>
              <h4 className="title">차세대 바이오 연구 성과 발표 및 기술 고도화 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="">
              <span className="date">12/24/2026</span>
              <span className="tag tag_1">Company News</span>
              <h4 className="title">차세대 바이오 연구 성과 발표 및 기술 고도화 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="">
              <span className="date">12/15/2026</span>
              <span className="tag tag_2">Press Release</span>
              <h4 className="title">글로벌 시장 진출을 위한 전략적 파트너십 체결</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="">
              <span className="date">11/06/2026</span>
              <span className="tag tag_3">Partnership</span>
              <h4 className="title">미래 바이오 산업 대응을 위한 기술 혁신 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="">
              <span className="date">12/24/2026</span>
              <span className="tag tag_1">Company News</span>
              <h4 className="title">차세대 바이오 연구 성과 발표 및 기술 고도화 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="">
              <span className="date">12/24/2026</span>
              <span className="tag tag_1">Company News</span>
              <h4 className="title">차세대 바이오 연구 성과 발표 및 기술 고도화 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="">
              <span className="date">12/15/2026</span>
              <span className="tag tag_2">Press Release</span>
              <h4 className="title">글로벌 시장 진출을 위한 전략적 파트너십 체결</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="">
              <span className="date">11/06/2026</span>
              <span className="tag tag_3">Partnership</span>
              <h4 className="title">미래 바이오 산업 대응을 위한 기술 혁신 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="">
              <span className="date">12/24/2026</span>
              <span className="tag tag_1">Company News</span>
              <h4 className="title">차세대 바이오 연구 성과 발표 및 기술 고도화 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="">
              <span className="date">12/24/2026</span>
              <span className="tag tag_1">Company News</span>
              <h4 className="title">차세대 바이오 연구 성과 발표 및 기술 고도화 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="">
              <span className="date">12/15/2026</span>
              <span className="tag tag_2">Press Release</span>
              <h4 className="title">글로벌 시장 진출을 위한 전략적 파트너십 체결</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="">
              <span className="date">11/06/2026</span>
              <span className="tag tag_3">Partnership</span>
              <h4 className="title">미래 바이오 산업 대응을 위한 기술 혁신 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="">
              <span className="date">12/24/2026</span>
              <span className="tag tag_1">Company News</span>
              <h4 className="title">차세대 바이오 연구 성과 발표 및 기술 고도화 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          
        </ul>
        <div className="pagenation">
          <a href=""><img className="p_first" src="/arrow_left.svg" alt="" /></a>
          <div className="number">
            <a href="" className="active">1</a>
            <a href="">2</a>
            <a href="">3</a>
            <a href="">4</a>
            <a href="">5</a>
          </div>
          <a href=""><img className="p_last" src="/arrow_left.svg" alt="" /></a>
        </div>
        <div className="mob load_more">LOAD MORE</div>
      </section>
    </div>
  );
}