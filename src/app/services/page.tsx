"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./services.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
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
    const section = document.querySelector(".sc_el_w");
    const scEls = document.querySelectorAll(".sc_el_w .sc_el");

    if (!(section instanceof HTMLElement)) return;
    if (scEls.length < 3) return;

    const firstEl = scEls[0] as HTMLElement;
    const secondEl = scEls[1] as HTMLElement;
    const thirdEl = scEls[2] as HTMLElement;

    const firstTitle = firstEl.querySelector(".sc_el_title");
    const secondTitle = secondEl.querySelector(".sc_el_title");

    if (!(firstTitle instanceof HTMLElement)) return;
    if (!(secondTitle instanceof HTMLElement)) return;

    const check = () => {
      const diff = section.offsetTop - window.scrollY;
      const range = window.innerHeight;

      let progress = 0;
      if (diff <= 0) progress = Math.min(Math.max(-diff / range, 0), 1);

      const progress2 = Math.min(progress / 0.5, 1);
      const progress3 = progress < 0.5 ? 0 : (progress - 0.5) / 0.5;

      const firstStyle = window.getComputedStyle(firstEl);
      const firstMarginBottom = parseFloat(firstStyle.marginBottom) || 0;
      const moveY2 = firstEl.offsetHeight + firstMarginBottom - firstTitle.offsetHeight - 1;

      const secondStyle = window.getComputedStyle(secondEl);
      const secondMarginBottom = parseFloat(secondStyle.marginBottom) || 0;
      const moveY3 = secondEl.offsetHeight + secondMarginBottom - secondTitle.offsetHeight - 2;

      secondEl.style.transform = `translateY(-${moveY2 * progress2}px)`;
      thirdEl.style.transform = `translateY(-${moveY2 + moveY3 * progress3}px)`;
    };

    window.addEventListener("scroll", check);
    check();

    return () => window.removeEventListener("scroll", check);
  }, []);



  const floatRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const setHeight = () => {
      const floatEl = floatRef.current;
      if (!floatEl) return;

      const items = floatEl.querySelectorAll<HTMLElement>(".sc_el");
      if (!items.length) return;

      let total = 0;

      items.forEach((el, i) => {
        const isLast = i === items.length - 1;

        if (isLast) {
          total += el.offsetHeight;
        } else {
          const title = el.querySelector<HTMLElement>(".sc_el_title");
          if (title) total += title.offsetHeight;
        }
      });

      floatEl.style.height = `${total}px`;
    };

    setHeight();

    window.addEventListener("resize", setHeight);
    window.addEventListener("load", setHeight);

    return () => {
      window.removeEventListener("resize", setHeight);
      window.removeEventListener("load", setHeight);
    };
  }, []);


  return (
    <div className="page_service">
      <div className="page_service_bg">
        <video autoPlay muted loop playsInline>
          <source src="https://kr1-api-object-storage.nhncloudservice.com/v1/AUTH_039eb4db2afd4f41aa39155e34c21e14/video/video_folder/templete_video_1.mp4"/>
        </video>
      </div>

      <section className="sec_1">
        <div className="txt_w bar ani">
          <h1 className="quote bar ani">Services</h1>
          <span className="quote">
            우리는 연구와 데이터에 기반한 혁신적인 생명과학 솔루션을 개발하며,과학적 검증과 기술적
            <br />
            전문성을 바탕으로지속 가능하고 장기적인 가치를 꾸준히 만들어갑니다.
          </span>
        </div>
      </section>

      <section className="sec_2 sc_el_w float-wrap ani hide">
        <ul className="float-el" ref={floatRef}>
          <li className="sc_el">
            <div className="sc_el_title">
              <div className="dot_icon_w">
                <div></div>
                <span>our service 01</span>
              </div>
              <h4 className="quote">Research & Development</h4>
            </div>

            <div className="sc_el_line"></div>

            

            <div className="sc_el_p">
              <img src="/dots.svg" />
              <p className="quote">
                우리는 기초 연구부터 응용 연구, 개발 단계까지 전 과정을 아우르는 체계적인 연구개발을 수행하며,
                <br />
                과학적 근거와 검증된 데이터를 바탕으로 신뢰할 수 있는 연구 결과와 기술적 성과를 도출합니다.
              </p>
            </div>
            <div className="sym_w">
              <img src="/sc_el_1.png" alt="Research & Development" />
            </div>

            <div className="sc_el_img_w">
              <img src="/s_s_1_1.jpg" />
              <img src="/s_s_1_2.jpg" />
              <img src="/s_s_1_3.jpg" />
            </div>
          </li>

          <li className="sc_el">
            <div className="sc_el_title">
              <div className="dot_icon_w">
                <div></div>
                <span>our service 02</span>
              </div>
              <h4 className="quote">Biotechnology Solutions</h4>
            </div>

            <div className="sc_el_line"></div>

            

            <div className="sc_el_p">
              <img src="/dots.svg" />
              <p className="quote">
                생명과학에 대한 깊은 이해와 기술적 전문성을 결합해 현실적인 문제 해결에 집중한 솔루션을 개발하며,
                <br />
                연구 환경과 산업 현장의 요구를 고려한 접근을 통해 실질적인 적용 가능성과 확장성을 확보합니다.
              </p>
            </div>
            <div className="sym_w">
              <img src="/sc_el_2.png" alt="Biotechnology Solutions" />
            </div>

            <div className="sc_el_img_w">
              <img src="/s_s_2_1.jpg" />
              <img src="/s_s_2_2.jpg" />
              <img src="/s_s_2_3.jpg" />
            </div>
          </li>

          <li className="sc_el">
            <div className="sc_el_title">
              <div className="dot_icon_w">
                <div></div>
                <span>our service 03</span>
              </div>
              <h4 className="quote">Data-Driven Innovation</h4>
            </div>

            <div className="sc_el_line"></div>

           

            <div className="sc_el_p">
              <img src="/dots.svg" />
              <p className="quote">
                연구 데이터와 분석 결과를 기반으로 의사결정의 정확성과 효율성을 높이고,
                <br />
                데이터 중심의 접근 방식을 통해 지속 가능한 혁신과 장기적인 가치를 만들어갑니다.
              </p>
            </div>

             <div className="sym_w">
              <img src="/sc_el_3.png" alt="Data Driven Innovation" />
            </div>

            <div className="sc_el_img_w">
              <img src="/s_s_3_1.jpg" />
              <img src="/s_s_3_2.jpg" />
              <img src="/s_s_3_3.jpg" />
            </div>
          </li>
        </ul>
      </section>

      <section className="sec_32"></section>
    </div>
  );
}