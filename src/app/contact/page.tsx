"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./contact.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const contactRef = useRef<HTMLDivElement | null>(null);
  const [isFailed, setIsFailed] = useState(false);

  const handleSubmit = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();

    if (!contactRef.current) return;

    const requiredFields = contactRef.current.querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement
    >("input[required], textarea[required]");

    let hasEmpty = false;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        hasEmpty = true;
      }
    });

    setIsFailed(hasEmpty);

    if (!hasEmpty) {
      console.log("submit");
    }
  };

  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;

    setFiles((prev) => [...prev, ...Array.from(selected)]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="page_contact">
      <div className="contact_inner" ref={contactRef}>
        <div className="contact_head bar ani">
          <h1 className="quote">Contact</h1>
          <span className="quote">
            당신의 브랜드에 대해 이야기해보세요.
            <br />
            작은 고민부터 새로운 도전까지, 함께 방향을 만들어갑니다.
          </span>
          <div className="mail_w hide">
            <div className="mail">divcontact@company.com</div>
          </div>
        </div>
        <div className="contact_body">
          <div className="flex">
            <label className="ani">
              <input required placeholder="" type="text" />
              <span>상호명*</span>
            </label>
            <label className="ani">
              <input required placeholder="" type="text" />
              <span>성함*</span>
            </label>
          </div>
          <div className="flex">
            <label className="ani">
              <input required placeholder="" type="text" />
              <span>이메일*</span>
            </label>
            <label className="ani">
              <input required placeholder="" type="text" />
              <span>연락처*</span>
            </label>
          </div>
          <div className="textarea_w ani">
            <span>문의내용*</span>

            <div className="textarea_inner hide scrollable">
              <textarea required></textarea>
            </div>
          </div>
        </div>
        <div className="contact_bottom hide ani">
          <div className="contact_bottom_inner">
            <label className="file_w">
            <input type="file" onChange={handleFileChange} />
            <span>파일첨부 +</span>
          </label>
            <ul className="file_list">
              {files.map((file, idx) => (
                <li key={idx}>
                  <span className="file_name">{file.name}</span>
                  <button type="button" onClick={() => handleRemoveFile(idx)}>
                    <img src="/icon_delete.svg"/>
                  </button>
                </li>
              ))}
            </ul>
            <span className={`failed ${isFailed ? "active" : ""}`}>
              필수 입력값이 누락되었습니다.
            </span>
            <label className="submit" onClick={handleSubmit}>
              <input type="submit" />
              <span>SEND</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}