"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./main.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const txtRef = useRef<HTMLDivElement | null>(null);

  const m1s1Ref = useRef<HTMLDivElement | null>(null);
  const m1s2Ref = useRef<HTMLDivElement | null>(null);

  const txt2Ref = useRef<HTMLDivElement | null>(null);
  const imgWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    const txt = txtRef.current;
    const m1s1 = m1s1Ref.current;
    const m1s2 = m1s2Ref.current;
    const txt2 = txt2Ref.current;
    const imgWrap = imgWrapRef.current;

    if (!section || !img || !txt || !m1s1 || !m1s2 || !txt2 || !imgWrap) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=100%",
        scrub: true,
        pin: true,
        pinSpacing: true,
      },
    });

    tl.to(img, { width: "33vw", height: "47.4vw", ease: "none" }, 0);
    tl.to(txt, { clipPath: "inset(0% 33% 0% 33%)", opacity: "0", ease: "none" }, 0);

    tl.fromTo(m1s1, { x: "-83vw" }, { x: "0vw", ease: "none" }, 0);
    tl.fromTo(m1s2, { x: "83vw" }, { x: "0vw", ease: "none" }, 0);

    // txt2가 top에 닿는 순간부터 main_1_img_s가 멈춘것처럼 만들기
    ScrollTrigger.create({
      trigger: txt2,
      start: "top top",
      onEnter: () => {
        const rect = imgWrap.getBoundingClientRect();
        const top = rect.top + window.scrollY;

        imgWrap.classList.add("abs_mode");
        imgWrap.style.top = `${top}px`;
      },
      onLeaveBack: () => {
        imgWrap.classList.remove("abs_mode");
        imgWrap.style.top = `0px`;
      },
    });


    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen page_main">
      <main>
        <section className="main_sec_1" ref={sectionRef}>
          <div className="m1_img_w">
            <img ref={imgRef} src="/main.jpg" alt="Main Visual" className="intro_img" />
          </div>

          <div ref={txtRef} className="main_1_txt_1">
            <h1>
              Advancing Biology
              <br />
              Through Precision Science
            </h1>

            <div className="main_1_txt_1_b">
              <img src="/main_1_icon_1.png" alt="Icon 1" />
              <span>
                우리는 연구와 데이터에 기반한 혁신적인
                <br />
                생명과학 솔루션을 개발하며, 장기적인 가치를 추구합니다.
              </span>
              <img src="/main_1_icon_2.png" alt="Icon 2" />
            </div>
          </div>

          <div ref={txt2Ref} className="main_1_txt_2">
            <h1>
              Focused on Research
              <br />
              Built for Impact
            </h1>
            <p>
              우리는 연구와 데이터에 기반한 과학적 접근과 기술적 전문성을 통해
              <br />
              생명과학의 가능성을 확장하고, 현실적인 문제 해결에 집중합니다.
            </p>
          </div>
        </section>

        {/* fixed 요소는 pin되는 section 밖으로 빼야함 */}
        <div ref={imgWrapRef} className="main_1_img_s">
          <div ref={m1s1Ref} className="m1s_1">
            <img src="/main_1_img_s_1.png" alt="Secondary Image" />
            <img src="/main_1_img_s_2.png" alt="Secondary Image" />
          </div>

          <div ref={m1s2Ref} className="m1s_2">
            <img src="/main_1_img_s_3.png" alt="Secondary Image" />
            <img src="/main_1_img_s_4.png" alt="Secondary Image" />
          </div>
        </div>

        <section style={{ height: "200vh" }}></section>
      </main>
    </div>
  );
}
