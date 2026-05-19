import { Router, type Request, type Response } from "express";
import nodemailer from "nodemailer";

const router = Router();

router.post("/contact", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER;
    const gmailPass = process.env.GMAIL_PASS || process.env.SMTP_PASS;

    if (!gmailUser || !gmailPass) {
      console.warn("Gmail SMTP credentials are not configured in environment variables. Message log:", { name, email, message });
      // Fallback: succeed on frontend but log locally so it doesn't break during dev
      res.status(200).json({ 
        success: true, 
        message: "Message received locally (SMTP credentials not configured)" 
      });
      return;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: gmailUser, // Send to yourself
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      text: `You have received a new message from your portfolio contact form.\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #6366f1; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 15px;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 11px; color: #999;">Sent automatically from your portfolio website contact form.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error: any) {
    console.error("Failed to send email via SMTP:", error);
    res.status(500).json({ error: "Failed to send message", details: error.message });
  }
});

export default router;
