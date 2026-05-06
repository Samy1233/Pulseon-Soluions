import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import transporter from "@/lib/mailer";

export async function GET() {
  try {
    await connectDB();

    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, contacts });
  } catch (error: any) {
    console.error("GET ERROR:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, company, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email and message are required" },
        { status: 400 }
      );
    }

    const newContact = await Contact.create({
      name,
      email,
      company,
      service,
      message,
    });

    try {
      await transporter.sendMail({
        from: {
          name: "Pulseon Solutions",
          address: process.env.EMAIL_USER as string,
        },
        to: process.env.NOTIFY_EMAIL,
        replyTo: email,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || "Not provided"}</p>
            <p><strong>Service Needed:</strong> ${service || "Not provided"}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        `,
      });
    } catch (mailError: any) {
      console.error("NOTIFY EMAIL ERROR:", mailError);
    }

    try {
      await transporter.sendMail({
        from: {
          name: "Pulseon Solutions",
          address: process.env.EMAIL_USER as string,
        },
        to: email,
        subject: "Thank you for contacting Pulseon Solutions",
        html: `
          <div style="margin:0; padding:0; background-color:#f8fafc; font-family:Arial, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
              <tr>
                <td align="center">
                  <table width="600" style="max-width:600px; width:100%; background:#ffffff; border-radius:16px; overflow:hidden;">
                    <tr>
                      <td style="background:#0f172a; padding:30px; text-align:center;">
                        <h1 style="margin:0; font-size:26px; color:#22d3ee;">Pulseon Solutions</h1>
                        <p style="margin:6px 0 0; font-size:14px; color:#cbd5e1;">
                          Build smarter. Scale faster.
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:30px;">
                        <h2 style="margin:0 0 15px; color:#0f172a;">Thank you for contacting us</h2>
                        <p>Hi ${name},</p>
                        <p>
                          We have successfully received your request. Our team will review it and get back to you shortly.
                        </p>
                        <p>
                          We appreciate your interest in Pulseon Solutions and look forward to assisting you.
                        </p>

                        <div style="margin:25px 0; text-align:center;">
                          <a href="https://pulseonsolutions.in"
                             style="background:#22d3ee; color:#0f172a; padding:12px 25px; text-decoration:none; border-radius:999px; font-weight:bold;">
                            Visit Website
                          </a>
                        </div>

                        <p>
                          Regards,<br/>
                          <strong>Pulseon Solutions Team</strong>
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td style="background:#f1f5f9; padding:15px; text-align:center; font-size:12px; color:#64748b;">
                        © 2026 Pulseon Solutions
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        `,
      });
    } catch (autoReplyError: any) {
      console.error("AUTO REPLY ERROR:", autoReplyError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully. We will contact you soon.",
        data: newContact,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}
