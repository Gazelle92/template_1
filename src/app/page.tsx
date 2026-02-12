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

  const sec2Ref = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    const txt = txtRef.current;
    const m1s1 = m1s1Ref.current;
    const m1s2 = m1s2Ref.current;
    const txt2 = txt2Ref.current;
    const imgWrap = imgWrapRef.current;
    const header = document.querySelector("header");
    if (!section || !img || !txt || !m1s1 || !m1s2 || !txt2 || !imgWrap) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=100%",
        scrub: true,
        pin: true,
        pinSpacing: false,

        onUpdate: (self) => {
          if (!header) return;

          if (self.progress > 0.95) {
            header.classList.add("no-filter");
          } else {
            header.classList.remove("no-filter");
          }
        },
      },
    });


    tl.fromTo(img, { width: "calc(100% - 40px)", height: "calc(100vh - 40px)"}, { width: "calc(33% - 0px)", height: "calc(80vh - 0px)", ease: "none" }, 0);
    tl.to(txt, { clipPath: "inset(0% 33% 0% 33%)", opacity: 0, ease: "none" }, 0);
    tl.fromTo(m1s1, { x: "-83vw" }, { x: "0vw", ease: "none" }, 0);
    tl.fromTo(m1s2, { x: "83vw" }, { x: "0vw", ease: "none" }, 0);
  }, []);

  useEffect(() => {
    const txt2 = txt2Ref.current;
    const imgWrap = imgWrapRef.current;
    if (!txt2 || !imgWrap) return;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const txt2Top = txt2.getBoundingClientRect().top + window.scrollY;

      if (scrollTop >= txt2Top) {
        imgWrap.classList.add("abs_mode");
      } else {
        imgWrap.classList.remove("abs_mode");
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // ✅ main_sec_2 높이 조절 이벤트 (m4ScrollEvent React 변환)
  /*
  useEffect(() => {
    const floatWrap = sec2Ref.current;
    const floatEl = listRef.current;

    if (!floatWrap || !floatEl) return;

    const handleScroll = () => {
      const els = floatEl.querySelectorAll(".sc_el") as NodeListOf<HTMLElement>;
      if (!els.length) return;

      const scrollTop = window.scrollY;
      const wrapTop = floatWrap.getBoundingClientRect().top + window.scrollY;

      const baseHeight = window.innerWidth > 1024 ? 70 : 90;

      const m4top = scrollTop - wrapTop;

      const innerHeights = Array.from(els).map((el) => el.scrollHeight);

      // max-height 세팅
      els.forEach((el, i) => {
        el.style.maxHeight = `${innerHeights[i]}px`;
      });

      // 기본 height 초기화
      els.forEach((el) => {
        el.style.height = `${baseHeight}px`;
      });

      // wrapTop 위에서는 첫번째만 풀 height 유지
      if (scrollTop <= wrapTop) {
        els[0].style.height = `${innerHeights[0]}px`;
      }

      // 구간1
      if (
        scrollTop >= wrapTop &&
        scrollTop < wrapTop + innerHeights[1] - baseHeight
      ) {
        els[0].style.height = `${innerHeights[0] - m4top}px`;
        els[1].style.height = `${m4top + baseHeight}px`;
        els[2].style.height = `${baseHeight}px`;
      }

      // 구간2
      else if (
        scrollTop >= wrapTop + innerHeights[1] - baseHeight &&
        scrollTop < wrapTop + innerHeights[1] + innerHeights[2]
      ) {
        els[0].style.height = `${baseHeight}px`;
        els[1].style.height = `${innerHeights[1] * 2 - m4top}px`;
        els[2].style.height = `${m4top - innerHeights[1] + baseHeight}px`;
      }

      // 구간3 (마지막)
      else if (scrollTop >= wrapTop + innerHeights[2]) {
        els[0].style.height = `${baseHeight}px`;
        els[1].style.height = `${baseHeight}px`;
        els[2].style.height = `${innerHeights[2] * 3 - m4top}px`;
      }

      // show 클래스 토글
      els.forEach((el) => {
        if (el.offsetHeight <= 200) el.classList.remove("show");
        else el.classList.add("show");
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
*/

useEffect(() => {
  const sec3 = document.querySelector(".main_sec_3") as HTMLElement | null;
  if (!sec3) return;

  const img2 = sec3.querySelector(".m3_img_w .m3_el:nth-child(2)") as HTMLElement | null;
  const img3 = sec3.querySelector(".m3_img_w .m3_el:nth-child(3)") as HTMLElement | null;
  const img4 = sec3.querySelector(".m3_img_w .m3_el:nth-child(4)") as HTMLElement | null;

  if (!img2 || !img3 || !img4) return;

  gsap.fromTo(
    img2,
    { left: "calc((8% - 0px) / 1 * 1)" },
    {
      left: `calc((100% - ${img2.offsetWidth}px) / 3 * 1)`,
      ease: "none",
      scrollTrigger: {
        trigger: sec3,
        start: "top top",
        end: "top+=30%",
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    img3,
    { left: "calc((16% - 0px) / 1 * 1)" },
    {
      left: `calc((100% - ${img3.offsetWidth}px) / 3 * 2)`,
      ease: "none",
      scrollTrigger: {
        trigger: sec3,
        start: "top top",
        end: "top+=30%",
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    img4,
    { left: "24%" },
    {
      left: `calc(100% - ${img4.offsetWidth}px)`,
      ease: "none",
      scrollTrigger: {
        trigger: sec3,
        start: "top top",
        end: "top+=30%",
        scrub: true,
      },
    }
  );


  gsap.fromTo(
    img2,
    { yPercent: 0 },
    {
      yPercent: 100,
      ease: "none",
      scrollTrigger: {
        trigger: sec3,
        start: "top+=30%",
      end: "top+=60%",

        scrub: true,
      },
    }
  );

  gsap.fromTo(
    img4,
    { yPercent: 0 },
    {
      yPercent: 100,
      ease: "none",
      scrollTrigger: {
        trigger: sec3,
        start: "top+=30%",
      end: "top+=60%",

        scrub: true,
      },
    }
  );

  ScrollTrigger.create({
    trigger: sec3,
    start: "top+=60%",
    toggleClass: { targets: ".m3_img_w", className: "txt_up" },
  });


}, []);


useEffect(() => {
  const sec4 = document.querySelector(".main_sec_4") as HTMLElement | null;
  if (!sec4) return;

  const img2 = sec4.querySelector(".sec_4_img") as HTMLElement | null;
  if (!img2) return;

  gsap.fromTo(
    img2,
    { 
      width: "33vw", 
      height: "80vh", 
      ease: "none" 
    },
    {
      width: "100vw", 
      height: "100vh", 
      ease: "none",
      scrollTrigger: {
        trigger: sec4,
        start: "top top",
        end: "top+=30%",
        scrub: true,
      },
    }
  );
}, []);

useEffect(() => {
  const target = document.querySelector(".main_sec_2");
  if (!(target instanceof HTMLElement)) return;

  const check = () => {
    const offsetTop = target.offsetTop;
    const scrollTop = window.scrollY;
    const diff = offsetTop - scrollTop;

    console.log("scrollTop:", scrollTop);
    console.log("offsetTop:", offsetTop);
    console.log("diff:", diff);
  };

  window.addEventListener("scroll", check);
  check();

  return () => window.removeEventListener("scroll", check);
}, []);


useEffect(() => {
  const section = document.querySelector(".main_sec_2");
  const scEls = document.querySelectorAll(".main_sec_2 .sc_el");

  if (!(section instanceof HTMLElement)) return;
  if (scEls.length < 2) return;

  const firstEl = scEls[0] as HTMLElement;
  const secondEl = scEls[1] as HTMLElement;

  const firstTitle = firstEl.querySelector(".sc_el_title");
  if (!(firstTitle instanceof HTMLElement)) return;

  const check = () => {
    const diff = section.offsetTop - window.scrollY;

    const firstHeight = firstEl.offsetHeight;
    const style = window.getComputedStyle(firstEl);
    const marginBottom = parseFloat(style.marginBottom) || 0;
    const titleHeight = firstTitle.offsetHeight;

    const maxMoveY = (firstHeight + marginBottom) - titleHeight;

    // progress 계산할 스크롤 구간 (원하는대로 조절 가능)
    const range = window.innerHeight; // 1스크린 내려가면 100% 이동

    let progress = 0;

    if (diff <= 0) {
      progress = Math.min(Math.max((-diff / range), 0), 1);
    }

    const currentMove = maxMoveY * progress;

    secondEl.style.transform = `translateY(-${currentMove}px)`;
  };

  window.addEventListener("scroll", check);
  check();

  return () => window.removeEventListener("scroll", check);
}, []);

useEffect(() => {
  const section = document.querySelector(".main_sec_2");
  const scEls = document.querySelectorAll(".main_sec_2 .sc_el");

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

    const range = window.innerHeight; // 전체 애니메이션 스크롤 길이

    let progress = 0;
    if (diff <= 0) progress = Math.min(Math.max((-diff / range), 0), 1);

    // 0~0.5 구간 progress
    let progress2 = Math.min(progress / 0.5, 1);

    // 0.5~1 구간 progress
    let progress3 = progress < 0.5 ? 0 : (progress - 0.5) / 0.5;

    // --- 2번째 이동값 (1번째 기준)
    const firstStyle = window.getComputedStyle(firstEl);
    const firstMarginBottom = parseFloat(firstStyle.marginBottom) || 0;

    const moveY2 =
      (firstEl.offsetHeight + firstMarginBottom) - firstTitle.offsetHeight;

    // --- 3번째 이동값 (2번째 기준)
    const secondStyle = window.getComputedStyle(secondEl);
    const secondMarginBottom = parseFloat(secondStyle.marginBottom) || 0;

    const moveY3 =
      (secondEl.offsetHeight + secondMarginBottom) - secondTitle.offsetHeight;

    // 2번째는 먼저 끝까지 이동
    secondEl.style.transform = `translateY(-${moveY2 * progress2}px)`;

    // 3번째는 2번째가 끝난 후부터 시작해야하니까 moveY2 포함해서 누적
    thirdEl.style.transform = `translateY(-${(moveY2 + moveY3 * progress3)}px)`;
  };

  window.addEventListener("scroll", check);
  check();

  return () => window.removeEventListener("scroll", check);
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

        <section className="main_sec_2 float-wrap" >
          <ul className="float-el">
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
                <img src="/dots.svg" />
                <p>
                  우리는 기초 연구부터 응용 연구, 개발 단계까지 전 과정을 아우르는 체계적인 연구개발을 수행하며,
                  <br />
                  과학적 근거와 검증된 데이터를 바탕으로 신뢰할 수 있는 연구 결과와 기술적 성과를 도출합니다.
                </p>
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
                <img src="/dots.svg" />
                <p>
                  생명과학에 대한 깊은 이해와 기술적 전문성을 결합해 현실적인 문제 해결에 집중한 솔루션을 개발하며,
                  <br />
                  연구 환경과 산업 현장의 요구를 고려한 접근을 통해 실질적인 적용 가능성과 확장성을 확보합니다.
                </p>
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
                <img src="/dots.svg" />
                <p>
                  연구 데이터와 분석 결과를 기반으로 의사결정의 정확성과 효율성을 높이고,
                  <br />
                  데이터 중심의 접근 방식을 통해 지속 가능한 혁신과 장기적인 가치를 만들어갑니다.
                </p>
              </div>
            </li>
          </ul>
        </section>

        <section className="main_sec_3 float-wrap">
          <div className="m3_img_w float-el">
            <div className="m3_el">
              <img src="/m_sec3_1.png" />
              <span>Innovation Platform</span>
            </div>
            <div className="m3_el">
              <img src="/m_sec3_2.png" />
              <span>Biotechnology<br/>Development Program</span>
            </div>
            <div className="m3_el">
              <img src="/m_sec3_3.png" />
              <span>Data-Driven Life Science Project</span>
            </div>
            <div className="m3_el">
              <img src="/m_sec3_4.png" />
              <span>Translational Science<br/>Initiative</span>
            </div>

            


          </div>
          <h1>
            RECENT
            <br />
            POST
          </h1>
        </section>

        <section className="main_sec_4 float-wrap">

            <img className="float-el sec_4_img" src="/main_last.jpg" alt="Final Image" />
        </section>

        <section className="main_sec_5">
          <div className="inner">
            <ul>
              <li>Home</li>
              <li>Company</li>
              <li>Services</li>
              <li>Projects</li>
              <li>Contact</li>
            
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
