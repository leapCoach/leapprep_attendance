import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  generateEmailTemplate,
  getNotificationSubject,
} from "@/src/utils/notificationHelpers";
import { supabaseAdmin } from "@/src/utils/supabaseAdminClient";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const smtpServer = process.env.SMTP_SERVER;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUsername = process.env.SMTP_USERNAME;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const emailFrom = process.env.EMAIL_FROM;
    const smtpUseTls = process.env.SMTP_USE_TLS;

    console.log("Incoming Email Payload:", payload);
    console.log("SMTP_SERVER:", smtpServer);
    console.log("SMTP_PORT:", smtpPort);
    console.log("SMTP_USERNAME:", smtpUsername);
    console.log("SMTP_PASSWORD:", smtpPassword ? "*****" : "not set"); // Mask password for security
    console.log("EMAIL_FROM:", emailFrom);
    console.log("SMTP_USE_TLS:", smtpUseTls);

    if (
      !smtpServer ||
      !smtpPort ||
      !smtpUsername ||
      !smtpPassword ||
      !emailFrom
    ) {
      // Update status to failed if credentials not configured
      if (payload.recordId && payload.type) {
        const table = payload.type === "checkin" ? "checkin" : "checkout";
        await supabaseAdmin
          .from(table)
          .update({ notification_status: "failed" })
          .eq("id", payload.recordId);
      }
      return NextResponse.json(
        { success: false, error: "SMTP credentials not fully configured." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpServer,
      port: parseInt(smtpPort),
      secure: false, // Use STARTTLS on port 587, not direct SSL
      requireTLS: true, // Enforce TLS after STARTTLS
      auth: {
        user: smtpUsername,
        pass: smtpPassword,
      },
    });

    const mailOptions = {
      from: emailFrom,
      to: payload.userEmail,
      subject: getNotificationSubject(payload.type),
      html: generateEmailTemplate(payload),
    };

    try {
      await transporter.sendMail(mailOptions);
      // Update status to sent on success
      if (payload.recordId && payload.type) {
        const table = payload.type === "checkin" ? "checkin" : "checkout";
        await supabaseAdmin
          .from(table)
          .update({ notification_status: "sent" })
          .eq("id", payload.recordId);
      }
      return NextResponse.json({ success: true, messageId: "email-sent" });
    } catch (mailError) {
      console.error("Error sending email:", mailError);
      // Update status to failed on email sending error
      if (payload.recordId && payload.type) {
        const table = payload.type === "checkin" ? "checkin" : "checkout";
        await supabaseAdmin
          .from(table)
          .update({ notification_status: "failed" })
          .eq("id", payload.recordId);
      }
      const errorMessage =
        mailError instanceof Error ? mailError.message : "Unknown error";
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
