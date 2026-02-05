"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./main.scss";

gsap.registerPlugin(ScrollTrigger);

gsap.timeline({
  scrollTrigger: {
    scrub: 1,
    trigger: ".scroll-trigger-ready__worm-wrap",
    start: "top 90%",
    end: "bottom 30%",
  },
});

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
    <div className="min-h-screen page_main scroll-trigger-ready__worm-wrap">
      <main>
        <section className="main_sec_1" ref={sectionRef}>
          <div className="m1_img_w">
            <img ref={imgRef}  src="/main.jpg" alt="Main Visual" className="intro_img" />
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
            <div className="main_1_btn_wrap">
              <img src="/main_1_btn.png" />
            </div>
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
        <div ref={imgWrapRef} data-speed="0" className="main_1_img_s">
          <div ref={m1s1Ref} className="m1s_1">
            <img src="/main_1_img_s_1.png" alt="Secondary Image" />
            <img src="/main_1_img_s_2.png" alt="Secondary Image" />
          </div>

          <div ref={m1s2Ref} className="m1s_2">
            <img src="/main_1_img_s_3.png" alt="Secondary Image" />
            <img src="/main_1_img_s_4.png" alt="Secondary Image" />
          </div>
        </div>

        <section className="main_sec_2">
          <ul>
            <li className="sc_el">
              <div className="sc_el_title">
                <div className="dot_icon_w">
                  <div></div>
                  <span>our sErvice 01</span>
                </div>
                <h4>Research & Development</h4>
              </div>
              <div className="sc_el_line"></div>
              <img src="/sc_el_1.png" alt="Service 1 Image" />
              <div className="sc_el_p">
                <img src="/dots.svg"/>
                <p>우리는 기초 연구부터 응용 연구, 개발 단계까지 전 과정을 아우르는 체계적인 연구개발을 수행하며,<br/>과학적 근거와 검증된 데이터를 바탕으로 신뢰할 수 있는 연구 결과와 기술적 성과를 도출합니다.</p>
                </div>
            </li>


            <li className="sc_el">
              <div className="sc_el_title">
                <div className="dot_icon_w">
                  <div></div>
                  <span>our sErvice 02</span>
                </div>
                <h4>Biotechnology Solutions</h4>
              </div>
              <div className="sc_el_line"></div>
              <img src="/sc_el_2.png" alt="Service 2 Image" />
              <div className="sc_el_p">
                <img src="/dots.svg"/>
                <p>생명과학에 대한 깊은 이해와 기술적 전문성을 결합해 현실적인 문제 해결에 집중한 솔루션을 개발하며,<br/>연구 환경과 산업 현장의 요구를 고려한 접근을 통해 실질적인 적용 가능성과 확장성을 확보합니다.</p>
                </div>
            </li>

            <li className="sc_el">
              <div className="sc_el_title">
                <div className="dot_icon_w">
                  <div></div>
                  <span>our sErvice 03</span>
                </div>
                <h4>Data-Driven Innovation</h4>
              </div>
              <div className="sc_el_line"></div>
              <img src="/sc_el_3.png" alt="Service 3 Image" />
              <div className="sc_el_p">
                <img src="/dots.svg"/>
                <p>연구 데이터와 분석 결과를 기반으로 의사결정의 정확성과 효율성을 높이고,<br/>데이터 중심의 접근 방식을 통해 지속 가능한 혁신과 장기적인 가치를 만들어갑니다.</p>
                </div>
            </li>
          </ul>
        </section>
        <section className="main_sec_3">
          <div className="m3_img_w">
            <img src="/m_sec3_1.png"/>
            <img src="/m_sec3_2.png"/>
            <img src="/m_sec3_3.png"/>
            <img src="/m_sec3_4.png "/>
          </div>
          <h1>RECENT<br/>POST</h1>
        </section>
        <section style={{ height: "200vh" }}></section>
      </main>
    </div>
  );
}
