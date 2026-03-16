import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    console.log("EMAIL_USER:", process.env.EMAIL_USER ? "loaded" : "missing");
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "loaded" : "missing");

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return Response.json(
        { success: false, error: "Missing SMTP credentials" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      text: message
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, error: "Email sending failed" },
      { status: 500 }
    );
  }
}
