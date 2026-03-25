"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./contact.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const contactRef = useRef<HTMLDivElement | null>(null);
  const [isFailed, setIsFailed] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [form, setForm] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setIsFailed(false);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();

    if (isSending) return;
    if (!contactRef.current) return;

    const requiredFields = contactRef.current.querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement
    >("input[required], textarea[required]");

    let hasEmpty = false;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) hasEmpty = true;
    });

    setIsFailed(hasEmpty);
    if (hasEmpty) return;

    try {
      setIsSending(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        alert(data.message || "메일 전송에 실패했습니다.");
        return;
      }

      alert("문의가 정상적으로 접수되었습니다.");

      setForm({
        company: "",
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setFiles([]);
      setIsFailed(false);
    } catch (error) {
      alert("메일 전송에 실패했습니다.");
    } finally {
      setIsSending(false);
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
              <input
                required
                placeholder=""
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
              />
              <span>상호명*</span>
            </label>

            <label className="ani">
              <input
                required
                placeholder=""
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <span>성함*</span>
            </label>
          </div>

          <div className="flex">
            <label className="ani">
              <input
                required
                placeholder=""
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              <span>이메일*</span>
            </label>

            <label className="ani">
              <input
                required
                placeholder=""
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
              <span>연락처*</span>
            </label>
          </div>

          <div className="textarea_w ani">
            <span>문의내용*</span>
            <div className="textarea_inner hide scrollable">
              <textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
              />
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
                    <img src="/icon_delete.svg" alt="" />
                  </button>
                </li>
              ))}
            </ul>

            <span className={`failed ${isFailed ? "active" : ""}`}>
              필수 입력값이 누락되었습니다.
            </span>

            <label className="submit" onClick={handleSubmit}>
              <input type="submit" />
              <span>{isSending ? "SENDING..." : "SEND"}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}