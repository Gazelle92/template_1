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
import CursorFollower from "../lib/CursorFollower";
import { update } from "three/examples/jsm/libs/tween.module.js";

gsap.registerPlugin(ScrollTrigger);

export default function Services2() {
  useEffect(() => {
    const setViewportHeight = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);

    return () => {
      window.removeEventListener("resize", setViewportHeight);
      document.documentElement.style.removeProperty("--vh");
    };
  }, []);

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
    { img: "/service_img_01.jpg", num: "our service 01", title: "11Research & Development", contents:"111우리는 기초 연구부터 응용 연구, 개발 단계까지 전 과정을 아우르는 체계적인 연구개발을 수행하며, 과학적 근거와 검증된 데이터를 바탕으로 신뢰할 수 있는 연구 결과와 기술적 성과를 도출합니다."},
    { img: "/service_img_02.jpg", num: "our service 02", title: "22Research & Development", contents:"222우리는 기초 연구부터 응용 연구, 개발 단계까지 전 과정을 아우르는 체계적인 연구개발을 수행하며, 과학적 근거와 검증된 데이터를 바탕으로 신뢰할 수 있는 연구 결과와 기술적 성과를 도출합니다."},
    { img: "/service_img_03.jpg", num: "our service 03", title: "33Research & Development", contents:"333우리는 기초 연구부터 응용 연구, 개발 단계까지 전 과정을 아우르는 체계적인 연구개발을 수행하며, 과학적 근거와 검증된 데이터를 바탕으로 신뢰할 수 있는 연구 결과와 기술적 성과를 도출합니다."},
    { img: "/service_img_01.jpg", num: "our service 04", title: "44Research & Development", contents:"444우리는 기초 연구부터 응용 연구, 개발 단계까지 전 과정을 아우르는 체계적인 연구개발을 수행하며, 과학적 근거와 검증된 데이터를 바탕으로 신뢰할 수 있는 연구 결과와 기술적 성과를 도출합니다."},
    { img: "/service_img_02.jpg", num: "our service 05", title: "55Research & Development", contents:"555우리는 기초 연구부터 응용 연구, 개발 단계까지 전 과정을 아우르는 체계적인 연구개발을 수행하며, 과학적 근거와 검증된 데이터를 바탕으로 신뢰할 수 있는 연구 결과와 기술적 성과를 도출합니다."},
    { img: "/service_img_03.jpg", num: "our service 06", title: "66Research & Development", contents:"666우리는 기초 연구부터 응용 연구, 개발 단계까지 전 과정을 아우르는 체계적인 연구개발을 수행하며, 과학적 근거와 검증된 데이터를 바탕으로 신뢰할 수 있는 연구 결과와 기술적 성과를 도출합니다."},
    { img: "/service_img_01.jpg", num: "our service 01", title: "77Research & Development", contents:"777우리는 기초 연구부터 응용 연구, 개발 단계까지 전 과정을 아우르는 체계적인 연구개발을 수행하며, 과학적 근거와 검증된 데이터를 바탕으로 신뢰할 수 있는 연구 결과와 기술적 성과를 도출합니다."},
    { img: "/service_img_02.jpg", num: "our service 02", title: "88Research & Development", contents:"888우리는 기초 연구부터 응용 연구, 개발 단계까지 전 과정을 아우르는 체계적인 연구개발을 수행하며, 과학적 근거와 검증된 데이터를 바탕으로 신뢰할 수 있는 연구 결과와 기술적 성과를 도출합니다."},
    { img: "/service_img_03.jpg", num: "our service 03", title: "99Research & Development", contents:"999우리는 기초 연구부터 응용 연구, 개발 단계까지 전 과정을 아우르는 체계적인 연구개발을 수행하며, 과학적 근거와 검증된 데이터를 바탕으로 신뢰할 수 있는 연구 결과와 기술적 성과를 도출합니다."}
  ];





  const getSlideOffsets = (clickedIndex: number) => {
    const bodyHeight = window.innerHeight;
    let a = (120 / 900) * bodyHeight;
    let o = 0.48 * bodyHeight;
    const vh = window.innerHeight;

    const base = vh * 0.18;
    const expanded = vh * 0.48;

    const distance = expanded - base;
    //const distance = base;

    const gap = 40;

    if (document.body.clientWidth <= 768) {
      a = (77 / 720) * bodyHeight;
      o = 0.3 * bodyHeight;
    }

    return {
      //marginTop: -distance * clickedIndex - distance / 2,
      //marginTop: -(window.innerHeight * 0.48 - window.innerHeight * 0.18 - 40) * (clickedIndex + 1),
      marginTop: -(distance * clickedIndex) - distance / 2,
      reverseMarginTop: distance * clickedIndex + distance / 2,
    };
  };
  /*
  const getSlideOffsets = (clickedIndex: number) => {
  const vh = window.innerHeight;

  const base = vh * 0.18;
  const expanded = vh * 0.48;
  const gap = 40;

  const distance = expanded - base;

  return {
    marginTop:
      -(distance * clickedIndex) -
      (gap * clickedIndex) -
      distance / 2,

    reverseMarginTop:
      distance * clickedIndex +
      gap * clickedIndex +
      distance / 2,
  };
};*/

const handleSlideClick = () => {
  if (isExpanded) return;

  const swiper = swiperRef.current;
  const container = sliderInnerRef.current;
  if (!swiper || !container) return;

  const clickedIndex = swiper.clickedIndex;
  if (clickedIndex == null || clickedIndex < 0) return;

  setClickedSlideIndex(clickedIndex);

  swiper.params.speed = 500;
  //swiper.mousewheel.disable();

  swiper.slideTo(clickedIndex, 500, false);
  const { marginTop } = getSlideOffsets(clickedIndex);

    container.style.marginTop = `${marginTop}px`;
    setIsExpanded(true);
    setIsTransition(false);
    setIsEnd(true);
    container.classList.add("transition");
    setTimeout(() => {
      container.classList.remove("transition");

      // 🔥 강제 리플로우 (이거 중요)
      container.offsetHeight;

      // 2️⃣ margin 즉시 복귀 (애니메이션 없음)
      container.style.marginTop = "0px";

      // 3️⃣ swiper 재정렬
      swiper.update();
      swiper.slideTo(clickedIndex, 0, false);

    }, 500);
};


const handleBack = () => {
  if (!isExpanded) return;

  const swiper = swiperRef.current;
  const container = sliderInnerRef.current;
  if (!swiper || !container) return;

  const index = clickedSlideIndex ?? 0;

  setIsTransition(true);
  setIsBack(true);
  setIsEnd(false);

  // 1️⃣ reverse offset 적용 (🔥 핵심)
  const { reverseMarginTop } = getSlideOffsets(index);
  container.style.marginTop = `${reverseMarginTop}px`;

  // 2️⃣ expand 해제 (슬라이드 줄어듦)
  setIsExpanded(false);

  // 3️⃣ transition 켜기 (margin 애니메이션용)
  container.classList.add("transition");

  setTimeout(() => {
    // 4️⃣ transition 제거해서 순간 이동 만들기
    container.classList.remove("transition");

    // 🔥 강제 리플로우
    container.offsetHeight;

    // 5️⃣ margin 제거
    container.style.marginTop = "0px";

    // 6️⃣ swiper 위치 재정렬
    
    swiper.slideTo(index, 0, false);
    swiper.mousewheel.enable();

    setIsTransition(false);
    setIsBack(false);
    swiper.update();
  }, 500); // 🔥 height 줄어드는 transition 시간 맞춰라
};



const [activeIndex, setActiveIndex] = useState(0);
const [prevIndex, setPrevIndex] = useState<number | null>(null);
const [direction, setDirection] = useState<"up" | "down" | null>(null);

const syncActiveList = () => {
  setTimeout(() => {
    const activeSlide = document.querySelector(
      ".service-swiper .swiper-slide-active"
    ) as HTMLElement | null;

    if (!activeSlide) return;

    const nextIndex = Number(activeSlide.dataset.slideIndex);

    // 방향 계산 ⭐
    if (nextIndex > activeIndex) {
      setDirection("down");
    } else if (nextIndex < activeIndex) {
      setDirection("up");
    }

    setPrevIndex(activeIndex);
    setActiveIndex(nextIndex);
  }, 100);
};

useEffect(() => {
  if (prevIndex === null) return;

  const timer = setTimeout(() => {
    setPrevIndex(null);
  }, 100); // 👈 exit 애니 시간 맞춰

  return () => clearTimeout(timer);
}, [prevIndex]);

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
          <ul className="left_list">
            {serviceList.map((item, index) => {
              let className = "";

              if (index === activeIndex) {
                className = `active ${direction}`;
              } else if (index === prevIndex) {
                className = `exit ${direction}`;
              }

              return (
                <li
                  key={index}
                  data-index={index}
                  className={className}
                >
                  <div className="dot_icon_w">
                    <div></div>
                    <span>{item.num}</span>
                  </div>
                  <div className="list_title">
                    <h1>{item.title}</h1>
                  </div>
                  <div className="list_contents">
                    <span>{item.contents}</span>
                  </div>
                </li>
              );  
            })}
          </ul>
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
                centeredSlides={true}
                direction="vertical"
                className="service-swiper"
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={syncActiveList}
                //onTransitionEnd={syncActiveList}
              >
              {serviceList.map((item, index) => (
                <SwiperSlide key={index} data-slide-index={index} className="service-slide" onClick={handleSlideClick}>
                  <div className="service-item">
                    <div className="img-box" >
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
        <CursorFollower />
      </div>
      
    </div>
  );
}
