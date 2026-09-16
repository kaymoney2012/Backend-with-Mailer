import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendOtpToEmail = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: `"Backend Class <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Your Verification OTP",
    text: `Thank you for registring at Fast-Track. To verify your email, please use the following OTP`,
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
    
    <h2 style="color: #ff6b00; margin-bottom: 10px;">
        Fast Track
    </h2>
    
    <p style="margin-top: 0;">
        Fast Food Delivered Fast
    </p>

    <h3>Email Verification</h3>

    <p>Hello Sir/Madam,</p>

    <p>Use the verification code below to complete your Fast Track account verification:</p>

    <div style="text-align: center; margin: 30px 0;">
        <div style="
            display: inline-block;
            background: #fff4eb;
            border: 2px solid #ff6b00;
            border-radius: 10px;
            padding: 15px 30px;
        ">
            <span style="
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 6px;
                color: #ff6b00;
            ">
                ${otp}
            </span>
        </div>
    </div>

    <p>This code will expire in <strong>15 minutes</strong>.</p>

    <p>If you did not request this verification code, please ignore this email.</p>

    <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">

    <p style="font-size: 12px; color: #777;">
        © ${new Date().getFullYear()} Fast Track. All rights reserved.
    </p>

</div>
`,
  });
};
