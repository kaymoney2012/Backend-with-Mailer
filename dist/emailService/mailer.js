import nodemailer from "nodemailer";
console.log("GMAIL_USER:", process.env.GMAIL_USER);
console.log("GMAIL_APP_PASSWORD exists:", !!process.env.GMAIL_APP_PASSWORD);
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
});
transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP VERIFY ERROR:", error);
    }
    else {
        console.log("SMTP READY");
    }
});
export const sendOtpToEmail = async (email, otp) => {
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
    }
    catch (error) {
        console.error("FAILED TO SEND EMAIL:", error);
        throw error;
    }
};
//# sourceMappingURL=mailer.js.map