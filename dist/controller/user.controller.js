import userAuth from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { generateOtp } from "../utils/generateOtp.js";
import { generateToken } from "../utils/generateToken.js";
// signup
export const signup = async (req, res) => {
    try {
        const { email, password, termsAndCondition, role } = req.body;
        const normalizedEmail = email.toLowerCase().trim();
        // check existing user
        const existingUser = await userAuth.findOne({ email });
        if (existingUser) {
            res.status(409).json({
                success: false,
                message: "An account with this email already exist"
            });
            return;
        }
        // hash password
        const hashPassword = await bcrypt.hash(password, 12);
        // generate OTP
        const otp = generateOtp();
        // OTP expires in 10 minutes
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
        // create user
        const user = await userAuth.create({
            email: normalizedEmail,
            password: hashPassword,
            termsAndCondition,
            role,
            isVerified: false,
            otp,
            otpExpiresAt,
        });
        res.status(201).json({
            success: true,
            message: "Account created successfully. Please, verify your account with the otp provided",
            data: {
                id: user._id,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
                otp,
            }
        });
    }
    catch (error) {
        console.error(error, "error creating account");
        res.status(500).json({
            success: false,
            message: "Something went wrong during signup"
        });
    }
};
// verify user
export const verifyUser = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            res.status(400).json({
                success: false,
                message: "email and otp is required"
            });
            return;
        }
        // check user
        const user = await userAuth.findOne({ email }).select("+otp +otpExpiresAt");
        if (!user) {
            res.status(400).json({
                success: false,
                message: "user not found"
            });
            return;
        }
        // Already verified
        if (user.isVerified === true) {
            res.status(400).json({
                success: false,
                message: "user has already been verified"
            });
            return;
        }
        // check otp
        if (user.otp !== otp) {
            res.status(400).json({
                success: false,
                message: "OTP is wrong"
            });
            return;
        }
        // no OTP
        if (!user.otp || !user.otpExpiresAt) {
            res.status(400).json({
                success: false,
                message: "OTP is invalid"
            });
            return;
        }
        // check OTP expiry
        if (user.otpExpiresAt.getTime() < Date.now()) {
            res.status(400).json({
                success: false,
                message: "OTP has expired"
            });
            return;
        }
        // verify user
        user.isVerified = true;
        // remove otp after successful verification
        // (user as any).otp = undefined;
        // (user as any).otpExpiresAt = undefined
        await user.save();
        res.status(200).json({
            success: true,
            message: "user verified successfully",
            data: {
                id: user._id,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
            }
        });
    }
    catch (error) {
        console.error(error, "verification error");
        res.status(500).json({
            successs: false,
            message: "error verifyimg user"
        });
    }
};
// signin
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email.toLowerCase().trim();
        // find user
        const user = await userAuth.findOne({ email: normalizedEmail });
        if (!user) {
            res.status(401).json({
                success: false,
                message: "user not found"
            });
            return;
        }
        // check user if verified
        if (!user.isVerified) {
            res.status(403).json({
                success: false,
                message: "user has not been verified"
            });
        }
        // check password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({
                success: false,
                message: "Invalid email or password"
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
            message: "signin successsful",
            data: {
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                    isVerified: user.isVerified,
                }
            }
        });
    }
    catch (error) {
        console.error(error, "error");
        res.status(400).json({
            success: false,
            message: "error signing in"
        });
    }
};
//# sourceMappingURL=user.controller.js.map