import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import transporter from "@/lib/mailer";

export async function GET() {
  try {
    await connectDB();

    const contacts = await Contact.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      contacts,
    });
  } catch (error: any) {
    console.error("GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch contacts",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    // ✅ Safe JSON parsing
    let body;
    try {
      body = await request.json();
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid JSON data" },
        { status: 400 }
      );
    }

    const { name, email, company, service, message } = body;

    // ✅ Strong validation
    if (
      !name?.trim() ||
      !email?.trim() ||
      !message?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and message are required",
        },
        { status: 400 }
      );
    }

    // ✅ Save to DB
    const newContact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      company: company?.trim() || "",
      service: service?.trim() || "",
      message: message.trim(),
    });

    // ✅ Check env before sending mail
    const EMAIL_USER = process.env.EMAIL_USER;
    const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL;

    if (!EMAIL_USER || !NOTIFY_EMAIL) {
      console.warn("⚠️ Email env variables missing");
    } else {
      // 🔔 Admin Notification Email
      try {
        await transporter.sendMail({
          from: {
            name: "Pulseon Solutions",
            address: EMAIL_USER,
          },
          to: NOTIFY_EMAIL,
          replyTo: email,
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || "Not provided"}</p>
            <p><strong>Service:</strong> ${service || "Not provided"}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        });
      } catch (err) {
        console.error("NOTIFY EMAIL ERROR:", err);
      }

      // 📩 Auto Reply Email
      try {
        await transporter.sendMail({
          from: {
            name: "Pulseon Solutions",
            address: EMAIL_USER,
          },
          to: email,
          subject: "Thank you for contacting Pulseon Solutions",
          html: `
            <h2>Thank you for contacting us</h2>
            <p>Hi ${name},</p>
            <p>We received your request and will get back to you soon.</p>
            <p><b>Pulseon Solutions Team</b></p>
          `,
        });
      } catch (err) {
        console.error("AUTO REPLY ERROR:", err);
      }
    }

    // ✅ Always return success (email failure won't break API)
    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
        data: newContact,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
