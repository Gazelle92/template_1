"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { Mousewheel } from "swiper/modules";
import "./swiper.scss";
import "./services-2.scss";
import BrandsScrollCanvas from "../components/common/BrandsScrollCanvas";

gsap.registerPlugin(ScrollTrigger);

export default function Services2() {
  useEffect(() => {
  document.body.classList.add("bg_black");

  return () => {
    document.body.classList.remove("bg_black");
  };

}, []);
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

  const swiperRef = useRef<SwiperClass | null>(null);
  const sliderInnerRef = useRef<HTMLDivElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTransition, setIsTransition] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [clickedSlideIndex, setClickedSlideIndex] = useState<number | null>(null);

  const serviceList = [
    { img: "/service_img_01.jpg", num: "our service 01", title: "Research & Development" },
    { img: "/service_img_02.jpg", num: "our service 02", title: "Research & Development" },
    { img: "/service_img_03.jpg", num: "our service 03", title: "Research & Development" },
    { img: "/service_img_01.jpg", num: "our service 04", title: "Research & Development" },
    { img: "/service_img_02.jpg", num: "our service 05", title: "Research & Development" },
    { img: "/service_img_03.jpg", num: "our service 06", title: "Research & Development" },
  ];





  const getSlideOffsets = (slideIndex: number) => {
    const bodyHeight = document.body.clientHeight;
    let a = (120 / 900) * bodyHeight;
    let o = 0.48 * bodyHeight;

    if (document.body.clientWidth <= 768) {
      a = (77 / 720) * bodyHeight;
      o = 0.3 * bodyHeight;
    }

    const distance = o - a;
    return {
      marginTop: -distance * slideIndex - distance / 2,
      reverseMarginTop: distance * slideIndex + distance / 2,
    };
  };

  const handleSlideClick = (index: number) => {
  if (isExpanded) return;

  const swiper = swiperRef.current;

  setIsExpanded(true);
  setIsTransition(true);
  setIsEnd(false);
  setIsBack(false);
  setClickedSlideIndex(index);

  // ❗ 먼저 상태 변경 (CSS 커짐)
  requestAnimationFrame(() => {
    if (!swiper) return;

    // ❗ 핵심: 커진 상태 기준으로 다시 계산
    swiper.update();

    // ❗ 핵심: 실제 위치 재정렬
    swiper.slideToLoop(index, 0, false);

    swiper.params.speed = 1000;
    swiper.params.slideToClickedSlide = true;
    swiper.mousewheel.disable();
  });

  setTimeout(() => {
    setIsTransition(false);
    setIsEnd(true);
  }, 300);
};

  const handleBack = () => {
  if (!isExpanded) return;

  const swiper = swiperRef.current;

  setIsTransition(true);
  setIsBack(true);
  setIsEnd(false);

  setTimeout(() => {
    setIsTransition(false);
    setIsBack(false);
    setIsExpanded(false);

    requestAnimationFrame(() => {
      if (!swiper) return;

      // ❗ 다시 작은 상태 기준으로 재계산
      swiper.update();

      swiper.slideToLoop(clickedSlideIndex ?? 0, 0, false);
      swiper.params.speed = 300;
      swiper.params.slideToClickedSlide = false;
      swiper.mousewheel.enable();
    });
  }, 300);
};
  return (
    <div className={`page_service-2${isExpanded ? " expand" : ""}${isTransition ? " transition" : ""}${isEnd ? " end" : ""}${isBack ? " back" : ""}`}>
      <div className="page_service_inner">
        <div className="back" onClick={() => handleBack()}>
          <img src="/arrow_left_slide.svg" alt="Back" />
        </div>
        <div className="left-box">
          <div className="title_w">
            <h1 className="quote">Services</h1>
            <span className="quote">연구와 데이터에 기반한 혁신적인 생명과학 솔루션을 개발하며,<br/>전문성을 바탕으로지속 가능하고 장기적인 가치를 꾸준히 만들어갑니다.</span>
          </div>
          <div className="back-button">
            <span onClick={handleBack}>Back</span>
          </div>
        </div>
        <div className="right-box">
          <div className="service-swiper-wrap" ref={sliderInnerRef}>

              <Swiper
        slidesPerView="auto"
        spaceBetween={40}
        loop={true}
        modules={[Mousewheel]}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: false
        }}
        slideToClickedSlide={false}
        //centeredSlides={true}
        direction="vertical"
        className="service-swiper"
        
      >
              {serviceList.map((item, index) => (
                <SwiperSlide key={index} className="service-slide">
                  <div className="service-item">
                    <div className="img-box" onClick={() => handleSlideClick(index)}>
                      <img src={item.img} alt={item.title} />
                    </div>

                    <div className="dot_icon_w">
                      <div></div>
                      <span>{item.num}</span>
                    </div>

                    <h1>{item.title}</h1>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className="canvas_w">
      <BrandsScrollCanvas />
      </div>
    </div>
  );
}