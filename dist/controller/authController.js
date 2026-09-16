import userModel from "../model/authMode.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// signup
export const register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        // check if user already exist
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exist"
            });
        }
        ;
        // check existing username
        const existingUsername = await userModel.findOne({ username });
        if (existingUsername) {
            res.status(400).json({
                message: "Username already exist"
            });
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create user
        const user = await userModel.create({
            name,
            username,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            mesage: "User created successfully",
            user: {
                id: user._id,
                name,
                username,
                email: user.email,
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error creating user account",
            error,
        });
    }
};
//  login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Account not found. Please, sign up",
            });
        }
        ;
        // compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                message: "Password or Email incorrect"
            });
        }
        // create JWT
        const token = jwt.sign({
            usrId: user._id,
        }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.json({
            message: "Login successful",
            _id: user._id,
            name: user.name,
            username: user.username,
            email,
            token,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to login or Something went wrong"
        });
    }
};
// get all registered users
export const getUser = async (req, res) => {
    try {
        const user = await userModel.findOne();
        res.status(200).json({
            success: true,
            message: "user profile loaded",
            user
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "error loading profile",
            error
        });
    }
};
//# sourceMappingURL=authController.js.map