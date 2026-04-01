"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./detail.scss";
import TransitionLink from "../components/common/TransitionLink";
gsap.registerPlugin(ScrollTrigger);

export default function Detail() {
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
    <div className="page_detail">
      <section className="detail_head ani bar">
        
        <div className="tag_w hide">
          <div className="tag_1">Company News</div>
        </div>
        <div className="title">
          <h1 className="quote">차세대 바이오 연구 성과 발표 및 기술 고도화 추진</h1>
          <div className="infos hide">
            <div className="view">
              <span>Views</span>
              <span className="view_count">1230</span>
            </div>
            <div className="date">12/24/2026</div>
          </div>
        </div>
        
      </section>
      <section className="detail_body">
        <div className="detail_contents">
          <img src="/list_el.jpg" className="ani hide" alt="" />
          <span className="quote">
            당사는 차세대 바이오 기술 경쟁력 강화를 위한 연구 성과를 발표하고, 핵심 기술 고도화를 위한 연구개발을 지속적으로 추진하고 있습니다. 이번 연구는 생명과학 분야의 혁신적 접근을 기반으로 바이오 기술의 정밀도와 효율성을 높이는 데 중점을 두고 진행되었습니다.
            <br/><br/>
            최근 바이오 산업은 정밀 의료와 맞춤형 치료 기술의 발전과 함께 빠르게 변화하고 있습니다. 이러한 환경 속에서 당사는 축적된 연구 데이터를 바탕으로 차세대 바이오 플랫폼을 고도화하고, 보다 안정적이고 효율적인 연구 체계를 구축하기 위해 다양한 연구 프로젝트를 진행하고 있습니다.
            <br/><br/>
            특히 이번 연구에서는 데이터 기반 분석 기술과 첨단 연구 장비를 활용해 기존 기술의 한계를 개선하고, 연구 효율성을 높일 수 있는 새로운 기술적 가능성을 확인했습니다. 이를 통해 향후 다양한 바이오 연구 분야에서 활용 가능한 기반 기술을 확보할 수 있을 것으로 기대하고 있습니다.
            <br/><br/>
            또한 당사는 글로벌 바이오 산업의 변화에 대응하기 위해 연구 인프라를 지속적으로 강화하고 있으며, 다양한 연구기관 및 산업 파트너와의 협력을 통해 기술 경쟁력을 확대해 나가고 있습니다. 이러한 협력은 연구 성과의 실질적인 활용 가능성을 높이고, 새로운 바이오 기술 개발을 가속화하는 데 중요한 역할을 할 것으로 보고 있습니다.
            <br/><br/>
            앞으로도 당사는 지속적인 연구개발과 기술 혁신을 통해 생명과학 분야의 새로운 가능성을 제시하고, 미래 바이오 산업을 선도하는 기업으로 성장해 나갈 계획입니다.

          </span>

        </div>
        
      </section>
      <section className="detail_foot ani bar">
        <TransitionLink href="/newsroom" className="prev hide">
          <span>PREV</span>
          <h4>신규 바이오 플랫폼 개발로 연구 경쟁력 강화</h4>
        </TransitionLink>

        <TransitionLink href="/newsroom" className="to_list  hide">LIST PAGE</TransitionLink>
        <TransitionLink href="/newsroom" className="next  hide">
          <span>NEXT</span>
          <h4>글로벌 시장 진출을 위한 전략적 파트너십 체결</h4>
        </TransitionLink>
      </section>
    </div>
  );
}