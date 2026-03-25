import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const company = String(body.company ?? "").trim();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!company || !name || !email || !phone || !message) {
      return NextResponse.json(
        { ok: false, message: "필수 입력값이 누락되었습니다." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, message: "이메일 형식이 올바르지 않습니다." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 465);
    const secure = process.env.SMTP_SECURE === "true";
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.MAIL_TO;

    if (!host || !user || !pass || !to) {
      return NextResponse.json(
        { ok: false, message: "메일 환경변수가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    const subject = `[CONTACT] ${company} / ${name}`;

    const text = [
      "새 문의가 접수되었습니다.",
      "",
      `상호명: ${company}`,
      `성함: ${name}`,
      `이메일: ${email}`,
      `연락처: ${phone}`,
      "",
      "문의내용:",
      message,
      "",
      `Time: ${new Date().toISOString()}`,
    ].join("\n");

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
        <h2 style="margin:0 0 16px;">새 문의가 접수되었습니다.</h2>
        <table style="border-collapse:collapse;width:100%;max-width:720px;">
          <tr><td style="padding:8px 0;font-weight:700;width:120px;">상호명</td><td style="padding:8px 0;">${escapeHtml(company)}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700;">성함</td><td style="padding:8px 0;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700;">이메일</td><td style="padding:8px 0;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700;">연락처</td><td style="padding:8px 0;">${escapeHtml(phone)}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700;vertical-align:top;">문의내용</td><td style="padding:8px 0;white-space:pre-wrap;">${escapeHtml(message)}</td></tr>
        </table>
      </div>
    `;

    await transporter.sendMail({
      from: `"Website Contact" <${user}>`,
      to,
      replyTo: email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, message: "메일 전송에 실패했습니다." },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}