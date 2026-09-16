import mongoose, { Schema, type Document } from "mongoose";

export type userRole = "seller" | "buyer";

export interface InewUser extends Document {
  email: string;
  password: string;
  termsAndCondition: boolean;
  role: userRole;
  isVerified: boolean;
  otp?: string;
  otpExpires?: Date;
}

const newUserSchema = new Schema<InewUser>(
  {
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
      validate: (value: boolean) => value === true,
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
  },
  {
    timestamps: true,
  },
);

const newUser = mongoose.model<InewUser>("newUser", newUserSchema);

export default newUser;
