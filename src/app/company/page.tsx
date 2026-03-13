"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./company.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Company() {

useEffect(() => {
    const counters = document.querySelectorAll(".counting");

    counters.forEach((el) => {
      const target = Number(el.getAttribute("data-count")) || 0;
      const obj = { value: 0 };

      gsap.to(obj, {
        value: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
        onUpdate: () => {
          el.textContent = Math.floor(obj.value).toLocaleString();
        },
      });
    });
  }, []);

useEffect(() => {
  const elements = document.querySelectorAll<HTMLElement>(".sym_w > img");

  const startTranslate = 15; // 최대 이동값

  const handleScroll = () => {
    const vh = window.innerHeight;

    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = vh / 2;

      // -1 ~ 1
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
    <div className="page_company">
      <section className="sec_1">
        <img src="/company_bg.jpg"/>
        <div className="txt_w">
          <h1>Company</h1>
          <span>우리는 연구와 데이터에 기반한 혁신적인 생명과학 솔루션을 개발하며,과학적 검증과 기술적<br/>전문성을 바탕으로지속 가능하고 장기적인 가치를 꾸준히 만들어갑니다.</span>
        </div>
      </section>
      <section className="sec_2">
        <div className="flex">
          <div className="txt_w">
            <div className="dot_icon_w">
              <div></div>
              <span>OUR Mission</span>
            </div>
            <h1>Advancing Science, Creating Real-World Impact</h1>
            <span>기초 연구에서부터 응용과 개발 단계까지 연구 전 과정을 유기적으로 연결하며, 검증 가능하고 재현성 있는 연구 성과를 현실적인 솔루션으로 확장하는 것을 목표로 합니다.</span>
          </div>
          <img src="/company_s_2_1.jpg" />
        </div>

        <div className="flex flex_reverse">
          <img src="/company_s_2_2.jpg" />
          <div className="txt_w">
            <div className="dot_icon_w">
              <div></div>
              <span>OUR PHILOSOPHY</span>
            </div>
            <h1>Science with Purpose</h1>
            <span>데이터의 정확성, 실험의 재현성, 그리고 결과의 적용 가능성을 연구의 핵심 기준으로 삼아 단기적인 성과보다 장기적인 가치에 집중합니다.</span>
          </div>
        </div>
      </section>

      <section className="sec_3">
        <img className="sec_3_bg" src="/company_s_3.jpg" />
        <ul className="flex_w">
          <li>
            <div className="counting_w">
              <div className="counting" data-count="100">0</div>&nbsp;
              <span className="unit">%</span>
            </div>
            <span>Data-Driven<br/>Research Process</span>
          </li>
          <li>
            <div className="counting_w">
              <div className="counting" data-count="1500">0</div>&nbsp;
              <span className="unit">X</span>
            </div>
            <span>Expanded Analytical<br/>Capability</span>
          </li>
          <li>
            <div className="counting_w">
              <div className="counting" data-count="250">0</div>
              <span className="unit"></span>
            </div>
            <span>Validated Experimental<br/>Cases</span>
          </li>
        </ul>

      </section>
      <section className="sec_4">
        <div className="float-wrap">
          <div className="sec_4_title">
            Our Business<br/>History
          </div>
          <ul>
            <li>
              <h4>2028</h4>
              <span>글로벌 연구 협력 네트워크 확대 및 공동 연구 프로젝트 진행</span>
              <span>연구 성과의 산업 적용을 위한 기술 이전 및 상용화 단계 진입</span>
            </li>

            <li>
              <h4>2027</h4>
              <span>핵심 연구 플랫폼 고도화 및 데이터 분석 체계 강화</span>
              <span>다수의 연구 과제 수행을 통해 연구 파이프라인 확장</span>
            </li>

            <li>
              <h4>2026</h4>
              <span>응용 연구 및 개발 단계 전략화</span>
              <span>연구 결과의 재현성 검증 및 표준화 프로세스 구축</span>
            </li>

            <li>
              <h4>2025</h4>
              <span>연구 범위 확장 및 전문 인력 연구팀 강화</span>
              <span>데이터 기반 연구 환경 및 분석 인프라 도입</span>
            </li>

            <li>
              <h4>2024</h4>
              <span>회사 설립 및 연구 인프라 구축</span>
              <span>기초 연구 중심의 초기 연구 프로젝트 착수</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
