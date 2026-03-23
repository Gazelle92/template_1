"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./contact.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
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
    <div className="page_contact">
      <div className="contact_inner">
        <div className="contact_head bar ani">
          <h1 className="quote">Contact</h1>
          <span className="quote">당신의 브랜드에 대해 이야기해보세요.<br/>작은 고민부터 새로운 도전까지, 함께 방향을 만들어갑니다.</span>
          <div className="mail_w hide">
            <div className="mail">divcontact@company.com</div>
          </div>
        </div>
        <div className="contact_body">
          <div className="flex">
            <label>
              <input placeholder="" type="text" />
              <span>상호명*</span>
            </label>
            <label>
              <input placeholder="" type="text" />
              <span>성함*</span>
            </label>
          </div>
          <div className="flex">
            <label>
              <input placeholder="" type="text" />
              <span>이메일*</span>
            </label>
            <label>
              <input placeholder="" type="text" />
              <span>연락처*</span>
            </label>
        
          </div>
          <div className="textarea_w">
            <span>문의내용*</span>
            
            <div className="textarea_inner">
              <textarea></textarea>
            </div>
            
          </div>
          
        </div>
        <div className="contact_bottom">
          <div className="contact_bottom_inner">
            <label className="file_w"><input type="file" name="" id="" /><span>파일첨부 +</span></label>
            <ul className="file_list"></ul>
            <span className="failed">필수 입력값이 누락되었습니다.</span>
            <label className="submit">
              <input type="submit" />
              <span>SEND</span>
            </label>
          </div>
          
          
        </div>
      </div>
    </div>
  );
}