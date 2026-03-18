"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./main.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLVideoElement | null>(null);
  const txtRef = useRef<HTMLDivElement | null>(null);

  const m1s1Ref = useRef<HTMLDivElement | null>(null);
  const m1s2Ref = useRef<HTMLDivElement | null>(null);

  const txt2Ref = useRef<HTMLDivElement | null>(null);
  const imgWrapRef = useRef<HTMLDivElement | null>(null);

  const sec2Ref = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1025px)", () => {
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

      tl.fromTo(
        img,
        { width: "calc(100% - 40px)", height: "calc(100vh - 40px)" },
        { width: "calc(33% - 0px)", height: "calc(80vh - 0px)", ease: "power1.inOut", },
        0
      );

      tl.fromTo(
        txt,
        { clipPath: "inset(40px 40px 40px 40px)", opacity: 1, ease: "none" },
        { clipPath: "inset(10% 33% 10% 33%)", opacity: 0, ease: "power1.inOut", },
        0
      );

      tl.fromTo(m1s1, { x: "-83vw" }, { x: "0vw", duration: 0.5 , ease: "power1.inOut" }, 0);
      tl.fromTo(m1s2, { x: "83vw" }, { x: "0vw", duration: 0.5 , ease: "power1.inOut" }, 0);

      return () => {
        header?.classList.remove("no-filter");
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => mm.revert();
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
      duration: 0.5 , ease: "power1.inOut",
      scrollTrigger: {
        trigger: sec3,
        start: "top top",
        end: "top+=20%",
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    img3,
    { left: "calc((16% - 0px) / 1 * 1)" },
    {
      left: `calc((100% - ${img3.offsetWidth}px) / 3 * 2)`,
      duration: 0.5 , ease: "power1.inOut",
      scrollTrigger: {
        trigger: sec3,
        start: "top top",
        end: "top+=20%",
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    img4,
    { left: "24%" },
    {
      left: `calc(100% - ${img4.offsetWidth}px)`,
      duration: 0.5 , ease: "power1.inOut",
      scrollTrigger: {
        trigger: sec3,
        start: "top top",
        end: "top+=20%",
        scrub: true,
      },
    }
  );


  gsap.fromTo(
    img2,
    { yPercent: 0 },
    {
      yPercent: 100,
      duration: 0.5 , ease: "power1.inOut",
      scrollTrigger: {
        trigger: sec3,
        start: "top+=20%",
      end: "top+=50%",

        scrub: true,
      },
    }
  );

  gsap.fromTo(
    img4,
    { yPercent: 0 },
    {
      yPercent: 100,
      duration: 0.5 , ease: "power1.inOut",
      scrollTrigger: {
        trigger: sec3,
        start: "top+=20%",
      end: "top+=50%",

        scrub: true,
      },
    }
  );

  ScrollTrigger.create({
    trigger: sec3,
    start: "top+=10%",
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
      width: "33%", 
      height: "80vh", 
      duration: 0.5 , ease: "power1.inOut",
    },
    {
      width: "calc(100% - 120px)", 
      height: "calc(100vh - 120px)", 
      duration: 0.5 , ease: "power1.inOut",
      scrollTrigger: {
        trigger: sec4,
        start: "top top",
        end: "top+=30%",
        scrub: true,
      },
    }
  );
  ScrollTrigger.create({
    trigger: sec4,
    start: "bottom bottom+=50%",
    toggleClass: { targets: ".m_4_txt_w", className: "txt_up" },
  });
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
      (firstEl.offsetHeight + firstMarginBottom) - firstTitle.offsetHeight - 1;

    // --- 3번째 이동값 (2번째 기준)
    const secondStyle = window.getComputedStyle(secondEl);
    const secondMarginBottom = parseFloat(secondStyle.marginBottom) || 0;

    const moveY3 =
      (secondEl.offsetHeight + secondMarginBottom) - secondTitle.offsetHeight - 2;

    secondEl.style.transform = `translateY(-${moveY2 * progress2}px)`;

    thirdEl.style.transform = `translateY(-${(moveY2 + moveY3 * progress3)}px)`;
  };

  window.addEventListener("scroll", check);
  check();

  return () => window.removeEventListener("scroll", check);
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
    <div className="min-h-screen page_main">
      <main>
        <section className="main_sec_1" ref={sectionRef}>
          <div className="m1_img_w">
            
            <video autoPlay muted loop playsInline className="intro_img" ref={imgRef}>
              <source src="/video/B01_01.mp4"/>
            </video>
          </div>

          <div ref={txtRef} className="main_1_txt_1">
            <h1 className="quote">
              Advancing Biology
              <br />
              Through Precision Science
            </h1>

            <div className="main_1_txt_1_b ani bar">
              <img src="/main_1_icon_1.png" alt="Icon 1" />
              <span className="quote">
                우리는 연구와 데이터에 기반한 혁신적인
                <br />
                생명과학 솔루션을 개발하며, 장기적인 가치를 추구합니다.
              </span>
              <img className="ani hide" src="/main_1_icon_2.png" alt="Icon 2" />
            </div>
          </div>

          <div ref={txt2Ref} className="main_1_txt_2">

            <div className="m1s_1 mob">
              <div className="sym_w ani">
                <img src="/main_1_img_s_1.png" alt="Secondary Image" className="sym" />
              </div>
              <div className="sym_w ani">
                <img src="/main_1_img_s_2.png" alt="Secondary Image" className="sym" />
              </div>
            </div>

            <div className="dot_icon_w">
              <div></div>
              <span>OUR COMPANY</span>
            </div>
            <h1 className="quote">
              Focused on Research
              <br />
              Built for Impact
            </h1>
            <p className="quote">
              우리는 연구와 데이터에 기반한 과학적 접근과 기술적 전문성을 통해
              <br />
              생명과학의 가능성을 확장하고, 현실적인 문제 해결에 집중합니다.
            </p>

            <div className="m1s_2 mob">
              <div className="sym_w ani">
              <img src="/main_1_img_s_3.png" alt="Secondary Image" className="sym"/>
              </div>
              <div className="sym_w ani">
              <img src="/main_1_img_s_4.png" alt="Secondary Image" className="sym"/>
              </div>
            </div>
          </div>
        </section>

        <div ref={imgWrapRef} data-speed="0" className="main_1_img_s pc">
          <div ref={m1s1Ref} className="m1s_1">
            <div className="sym_w">
              <img src="/main_1_img_s_1.png" alt="Secondary Image" className="sym"/>
            </div>
            <div className="sym_w">
              <img src="/main_1_img_s_2.png" alt="Secondary Image" className="sym"/>
            </div>
          </div>

          <div ref={m1s2Ref} className="m1s_2">
            <div className="sym_w">
              <img src="/main_1_img_s_3.png" alt="Secondary Image" className="sym"/>
            </div>
            <div className="sym_w">
              <img src="/main_1_img_s_4.png" alt="Secondary Image" className="sym"/>
            </div>
          </div>
        </div>

        <section className="main_sec_2 float-wrap" >
          <ul className="float-el" ref={floatRef}>
            <li className="sc_el">
              <div className="sc_el_title">
                <div className="dot_icon_w ani hide">
                  <div></div>
                  <span>our service 01</span>
                </div>
                <h4 className="quote">Research & Development</h4>
              </div>
              <div className="sc_el_line"></div>
              
              <div className="sym_w">
                <img src="/sc_el_1.png" alt="Service 1 Image" />
              </div>
              <div className="sc_el_p">
                <img className="ani hide" src="/dots.svg" />
                <p className="quote">
                  우리는 기초 연구부터 응용 연구, 개발 단계까지 전 과정을 아우르는 체계적인 연구개발을 수행하며,
                  <br />
                  과학적 근거와 검증된 데이터를 바탕으로 신뢰할 수 있는 연구 결과와 기술적 성과를 도출합니다.
                </p>
              </div>
            </li>

            <li className="sc_el">
              <div className="sc_el_title">
                <div className="dot_icon_w ani hide">
                  <div></div>
                  <span>our sErvice 02</span>
                </div>
                <h4 className="quote">Biotechnology Solutions</h4>
              </div>
              <div className="sc_el_line"></div>
              <div className="sym_w">
                <img src="/sc_el_2.png" alt="Service 1 Image" />
              </div>
              <div className="sc_el_p">
                <img className="ani hide" src="/dots.svg" />
                <p className="quote">
                  생명과학에 대한 깊은 이해와 기술적 전문성을 결합해 현실적인 문제 해결에 집중한 솔루션을 개발하며,
                  <br />
                  연구 환경과 산업 현장의 요구를 고려한 접근을 통해 실질적인 적용 가능성과 확장성을 확보합니다.
                </p>
              </div>
            </li>

            <li className="sc_el">
              <div className="sc_el_title">
                <div className="dot_icon_w ani hide">
                  <div></div>
                  <span>our sErvice 03</span>
                </div>
                <h4 className="quote">Data-Driven Innovation</h4>
              </div>
              <div className="sc_el_line"></div>
              <div className="sym_w">
                <img src="/sc_el_3.png" alt="Service 1 Image" />
              </div>
              <div className="sc_el_p">
                <img className="ani hide" src="/dots.svg" />
                <p className="quote">
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
            <div className="m3_el ani">
              <div className="sym_w">
                <img src="/m_sec3_1.png" className="sym" />
              </div>
              <span>Innovation Platform</span>
            </div>
            <div className="m3_el ani">
              <div className="sym_w">
                <img src="/m_sec3_2.png" className="sym" />
              </div>
              <span>Biotechnology<br/>Development Program</span>
            </div>
            <div className="m3_el ani">
              <div className="sym_w">
                <img src="/m_sec3_3.png" className="sym" />
              </div>
              <span>Data-Driven Life<br/>Science Project</span>
            </div>
            <div className="m3_el ani">
              <div className="sym_w">
                <img src="/m_sec3_4.png" className="sym" />
              </div>
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
          <div className="float-el sec_4_img">
            <video className="float-bg" autoPlay muted loop playsInline>
              <source src="/video/B01_02.mp4"/>
            </video>
            <div className="m_4_txt_w">
              <div className="dot_icon_w">
                <div></div>
                <span>Contact us</span>
              </div>
              <h1>Get in Touch With Us</h1>
              <span>연구 및 기술 협업, 사업 파트너십 등 다양한 협력 가능성에 대해<br/>편하게 문의해 주시기 바랍니다.</span>
              <a href="#"><span>Contact us</span><img src="/arrow_right.svg"/></a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
