import mongoose, { Schema } from "mongoose";
const newUserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    termsAndCondition: {
        type: Boolean,
        required: [true, "Terms and condition is required"],
        validate: (value) => value === true,
        message: "You must accept the terms and conditions",
    },
    role: {
        type: String,
        enum: ["seller", "buyer"],
        required: [true, "role is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
}, {
    timestamps: true,
});
const newUser = mongoose.model("newUser", newUserSchema);
export default newUser;
//# sourceMappingURL=newUserModel.js.map