import type { Request, Response } from "express";
import newUser, { type userRole } from "../model/newUserModel.js";
import bcrypt from "bcryptjs";
import { sendOtpToEmail } from "../emailService/mailer.js";

// Generate OTP
const generateNewOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Signup
export const signup = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      termsAndCondition,
      role,
    } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await newUser.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const otp = generateNewOtp();

    const user = await newUser.create({
      email: normalizedEmail,
      password: hashPassword,
      termsAndCondition,
      role,
      otp,
      isVerified: false,
      otpExpires: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendOtpToEmail(normalizedEmail, otp);

    return res.status(201).json({
      message: "signup successful. Check your email for your OTP",
      userId: user._id,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "signup error",
    });
  }
};

// Verify OTP
export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const user = await newUser.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email is already verified",
      });
    }

    if (!user.otp || !user.otpExpires) {
      return res.status(400).json({
        message: "No OTP found",
      });
    }

    if (user.otpExpires.getTime() < Date.now()) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid or wrong OTP",
      });
    }

    user.isVerified = true;

    await user.save();

    return res.status(200).json({
      message: "Email has successfully verified",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Verification error",
    });
  }
};

// Re-send OTP — old OTP is invalidated because user.otp is overwritten
export const resendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const user = await newUser.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "User already verified",
      });
    }

    const otp = generateNewOtp();

    // Overwriting user.otp invalidates the previous OTP
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    await sendOtpToEmail(normalizedEmail, otp);

    return res.json({
      message: "A new OTP has been sent. Your previous OTP is now invalid.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error sending OTP",
    });
  }
};

//signin
export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    // find user
    const user = await newUser.findOne({ email: normalizedEmail });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "user not found",
      });
      return;
    }

    // check user if verified
    if (!user.isVerified) {
      res.status(403).json({
        success: false,
        message: "user has not been verified",
      });
      return;
    }

    // check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    // generate JWT
    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    res.status(200).json({
      success: true,
      message: "signin successful",
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
        },
      },
    });
  } catch (error) {
    console.error(error, "error");

    res.status(500).json({
      success: false,
      message: "error signing in",
    });
  }
};

function generateToken(arg0: { id: string; email: string; role: userRole }) {
  throw new Error("Function not implemented.");
}
