"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./contact.scss";

gsap.registerPlugin(ScrollTrigger);

// iOS Safari 호환성을 위한 GSAP 설정
gsap.defaults({ force3D: false });

type SubmitStatus = "idle" | "loading" | "success" | "error";

const CIRCLE_LENGTH = 204.2;

export default function Contact() {
  const contactRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isFailed, setIsFailed] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [progress, setProgress] = useState(0);

  const [form, setForm] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (submitStatus !== "loading") return;

    let current = 0;
    const timer = setInterval(() => {
      current += (1 - current) * 0.18;

      if (current >= 0.94) {
        current = 0.94;
        clearInterval(timer);
      }

      setProgress(current);
    }, 120);

    return () => clearInterval(timer);
  }, [submitStatus]);

  useEffect(() => {
    if (submitStatus === "success" || submitStatus === "error") {
      const timer = setTimeout(() => {
        setSubmitStatus("idle");
        setProgress(0);
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setIsFailed(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;

    const newFiles = Array.from(selected);

    setFiles((prev) => {
      const merged = [...prev, ...newFiles];

      const uniqueFiles = merged.filter(
        (file, index, self) =>
          index ===
          self.findIndex(
            (f) =>
              f.name === file.name &&
              f.size === file.size &&
              f.lastModified === file.lastModified
          )
      );

      return uniqueFiles;
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();

    if (submitStatus === "loading") return;
    if (!contactRef.current) return;

    const requiredFields = contactRef.current.querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement
    >("input[required], textarea[required]");

    let hasEmpty = false;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) hasEmpty = true;
    });

    setIsFailed(hasEmpty);

    if (hasEmpty) {
      setSubmitStatus("error");
      return;
    }

    try {
      setSubmitStatus("loading");
      setProgress(0.08);

      const formData = new FormData();
      formData.append("company", form.company);
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("message", form.message);

      files.forEach((file) => {
        formData.append("files", file);
      });

      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      setProgress(1);

      setTimeout(() => {
        if (!res.ok || !data?.success) {
          setSubmitStatus("error");
          return;
        }

        setSubmitStatus("success");
        setForm({
          company: "",
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setFiles([]);
        setIsFailed(false);
      }, 300);
    } catch (error) {
      setProgress(1);

      setTimeout(() => {
        setSubmitStatus("error");
      }, 300);
    }
  };

  const buttonClassName = [
    "submit progress-button",
    submitStatus === "loading" ? "loading" : "",
    submitStatus === "success" ? "success" : "",
    submitStatus === "error" ? "error" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const circleOffset = CIRCLE_LENGTH * (1 - progress);

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
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
              />
              <span>파일첨부 +</span>
            </label>

            <ul className="file_list">
              {files.map((file, idx) => (
                <li key={`${file.name}-${file.size}-${file.lastModified}`}>
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

            <label className={buttonClassName} onClick={handleSubmit}>
              <input type="submit" />
              <button type="button">
                <span>
                  {submitStatus === "loading"
                    ? "SENDING"
                    : submitStatus === "success"
                    ? "DONE"
                    : submitStatus === "error"
                    ? "ERROR"
                    : "SEND"}
                </span>
              </button>
              <svg className="progress-circle" width="70" height="70" viewBox="0 0 70 70">
                <circle
                  cx="35"
                  cy="35"
                  r="32.5"
                  pathLength="204.2"
                  style={{
                    strokeDasharray: CIRCLE_LENGTH,
                    strokeDashoffset: circleOffset,
                  }}
                />
              </svg>

              <svg className="checkmark" width="70" height="70" viewBox="0 0 70 70">
                <path d="M23 37.5L31 45L47 25" />
              </svg>

              <svg className="cross" width="70" height="70" viewBox="0 0 70 70">
                <path d="M25 25L45 45" />
                <path d="M45 25L25 45" />
              </svg>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}