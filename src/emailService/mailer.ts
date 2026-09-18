import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendOtpToEmail = async (
  email: string,
  otp: string
): Promise<void> => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Class" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your Verification OTP",
      text: `Your verification code is ${otp}. It expires in 15 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="text-align: center; color: #333;">
            Login to Your Account
          </h1>

          <h2 style="text-align: center; color: #555;">
            Email Verification
          </h2>

          <p style="text-align: center;">
            Your verification code is:
          </p>

          <p style="
            text-align: center;
            font-weight: 900;
            font-size: 32px;
            letter-spacing: 10px;
            color: #2563eb;
          ">
            ${otp}
          </p>

          <p style="text-align: center; color: #666;">
            Enter this code within the next
            <strong>15 minutes</strong>
            to log in to your account.
          </p>
        </div>
      `,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};
