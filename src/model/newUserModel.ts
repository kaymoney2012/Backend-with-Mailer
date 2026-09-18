import mongoose, { Schema, type Document } from "mongoose";


export interface InewUser extends Document {
    email: string;
    password: string;
    isVerified: boolean;
    otp?: string;
    otpExpires?: Date;
}

const newUserSchema = new Schema<InewUser>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
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
    }
);

const newUser = mongoose.model<InewUser>("newUser", newUserSchema);

export default newUser;