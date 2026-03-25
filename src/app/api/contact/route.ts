import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_PORT ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS ||
      !process.env.MAIL_TO
    ) {
      return NextResponse.json(
        { success: false, message: "메일 환경변수가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const formData = await req.formData();

    const company = String(formData.get("company") || "");
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("phone") || "");
    const message = String(formData.get("message") || "");

    if (!company || !name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, message: "필수값이 누락되었습니다." },
        { status: 400 }
      );
    }

    const uploadedFiles = formData.getAll("files").filter((item) => item instanceof File) as File[];

    const maxFileSize = 10 * 1024 * 1024;
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/zip",
      "application/x-zip-compressed",
      "application/illustrator",
      "application/postscript",
    ];

    for (const file of uploadedFiles) {
      if (file.size > maxFileSize) {
        return NextResponse.json(
          { success: false, message: `${file.name} 파일은 10MB 이하만 업로드 가능합니다.` },
          { status: 400 }
        );
      }

      if (file.type && !allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { success: false, message: `${file.name} 파일 형식은 업로드할 수 없습니다.` },
          { status: 400 }
        );
      }
    }

    const attachments = await Promise.all(
      uploadedFiles.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return {
          filename: file.name,
          content: buffer,
          contentType: file.type || undefined,
        };
      })
    );

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `[문의] ${name}님의 문의입니다`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>새 문의가 도착했습니다</h2>
          <p><strong>상호명:</strong> ${escapeHtml(company)}</p>
          <p><strong>성함:</strong> ${escapeHtml(name)}</p>
          <p><strong>이메일:</strong> ${escapeHtml(email)}</p>
          <p><strong>연락처:</strong> ${escapeHtml(phone)}</p>
          <p><strong>첨부파일 개수:</strong> ${attachments.length}개</p>
          <p><strong>문의내용:</strong></p>
          <div style="white-space: pre-wrap; border: 1px solid #ddd; padding: 12px; border-radius: 8px;">
            ${escapeHtml(message)}
          </div>
        </div>
      `,
      attachments,
    });

    return NextResponse.json({
      success: true,
      message: "메일이 성공적으로 전송되었습니다.",
    });
  } catch (error) {
    console.error("메일 전송 오류:", error);

    return NextResponse.json(
      { success: false, message: "메일 전송에 실패했습니다." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}