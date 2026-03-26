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

  useEffect(() => {
    let handleResize: (() => void) | null = null;

    const timer = setTimeout(() => {
      const items = gsap.utils.toArray<HTMLElement>(".grid_4x4 > li");
      if (!items.length) return;

      gsap.set(items, { y: 10, opacity: 0 });

      const rows: HTMLElement[][] = [];
      let currentRow: HTMLElement[] = [];
      let lastTop: number | null = null;
      const tolerance = 10;

      items.forEach((item) => {
        const top = Math.round(item.offsetTop);

        if (lastTop === null || Math.abs(top - lastTop) <= tolerance) {
          currentRow.push(item);
        } else {
          rows.push(currentRow);
          currentRow = [item];
        }

        lastTop = top;
      });

      if (currentRow.length) rows.push(currentRow);

      rows.forEach((row) => {
        gsap.to(row, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: row[0],
            start: "top bottom-=10%",
            once: true,
          },
        });
      });

      // 👉 여기서 할당
      handleResize = () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (
            trigger.vars.trigger &&
            (trigger.vars.trigger as Element).matches?.(".grid_4x4 > li")
          ) {
            trigger.kill();
          }
        });

        gsap.set(items, { y: 10, opacity: 0 });

        const newRows: HTMLElement[][] = [];
        let newCurrentRow: HTMLElement[] = [];
        let newLastTop: number | null = null;

        items.forEach((item) => {
          const top = Math.round(item.offsetTop);

          if (newLastTop === null || Math.abs(top - newLastTop) <= tolerance) {
            newCurrentRow.push(item);
          } else {
            newRows.push(newCurrentRow);
            newCurrentRow = [item];
          }

          newLastTop = top;
        });

        if (newCurrentRow.length) newRows.push(newCurrentRow);

        newRows.forEach((row) => {
          gsap.to(row, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: row[0],
              start: "top bottom-=10%",
              once: true,
            },
          });
        });

        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);
    }, 1000);

    return () => {
      clearTimeout(timer);

      // 👉 존재할 때만 제거
      if (handleResize) {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);


  return (
    <div className="page_newsroom">
      <section className="list_head bar ani">
        <h1 className="quote bar ani">Newsroom</h1>
        <div className="tag_w ani hide">
          <div className="view_all">View ALL</div>
          <div>Company News</div>
          <div>Press Release</div>
          <div>Partnership</div>
        </div>
        
      </section>
      <section className="list_body">
        <ul className="grid_4x4">
          <li className="ani">
            <a href="/detail">
              <span className="date">12/24/2026</span>
              <span className="tag tag_1">Company News</span>
              <h4 className="title">차세대 바이오 연구 성과 발표 및 기술 고도화 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="/detail">
              <span className="date">12/15/2026</span>
              <span className="tag tag_2">Press Release</span>
              <h4 className="title">글로벌 시장 진출을 위한 전략적 파트너십 체결</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="/detail">
              <span className="date">11/06/2026</span>
              <span className="tag tag_3">Partnership</span>
              <h4 className="title">미래 바이오 산업 대응을 위한 기술 혁신 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="/detail">
              <span className="date">12/24/2026</span>
              <span className="tag tag_1">Company News</span>
              <h4 className="title">차세대 바이오 연구 성과 발표 및 기술 고도화 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="/detail">
              <span className="date">12/24/2026</span>
              <span className="tag tag_1">Company News</span>
              <h4 className="title">차세대 바이오 연구 성과 발표 및 기술 고도화 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="/detail">
              <span className="date">12/15/2026</span>
              <span className="tag tag_2">Press Release</span>
              <h4 className="title">글로벌 시장 진출을 위한 전략적 파트너십 체결</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="/detail">
              <span className="date">11/06/2026</span>
              <span className="tag tag_3">Partnership</span>
              <h4 className="title">미래 바이오 산업 대응을 위한 기술 혁신 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="/detail">
              <span className="date">12/24/2026</span>
              <span className="tag tag_1">Company News</span>
              <h4 className="title">차세대 바이오 연구 성과 발표 및 기술 고도화 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="/detail">
              <span className="date">12/24/2026</span>
              <span className="tag tag_1">Company News</span>
              <h4 className="title">차세대 바이오 연구 성과 발표 및 기술 고도화 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="/detail">
              <span className="date">12/15/2026</span>
              <span className="tag tag_2">Press Release</span>
              <h4 className="title">글로벌 시장 진출을 위한 전략적 파트너십 체결</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="/detail">
              <span className="date">11/06/2026</span>
              <span className="tag tag_3">Partnership</span>
              <h4 className="title">미래 바이오 산업 대응을 위한 기술 혁신 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="/detail">
              <span className="date">12/24/2026</span>
              <span className="tag tag_1">Company News</span>
              <h4 className="title">차세대 바이오 연구 성과 발표 및 기술 고도화 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="/detail">
              <span className="date">12/24/2026</span>
              <span className="tag tag_1">Company News</span>
              <h4 className="title">차세대 바이오 연구 성과 발표 및 기술 고도화 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="/detail">
              <span className="date">12/15/2026</span>
              <span className="tag tag_2">Press Release</span>
              <h4 className="title">글로벌 시장 진출을 위한 전략적 파트너십 체결</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="/detail">
              <span className="date">11/06/2026</span>
              <span className="tag tag_3">Partnership</span>
              <h4 className="title">미래 바이오 산업 대응을 위한 기술 혁신 추진</h4>
              <div className="more"><span>Read more →</span></div>
              <img src="/list_el.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="/detail">
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