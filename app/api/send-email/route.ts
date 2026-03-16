import nodemailer from "nodemailer";

export async function POST(req: Request) {
  console.log("API route reached");
  console.log("Email user:", process.env.EMAIL_USER);

  try {
    const { name, email, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "hosanazitti@gmail.com",
      subject: `Portfolio Message from ${name}`,
      text: message,
      html: `
        <h3>New message from portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return Response.json({ success: false, error });
  }
}
