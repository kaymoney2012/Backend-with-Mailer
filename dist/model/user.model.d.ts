import mongoose, { type Document } from "mongoose";
export type userRole = "landlord" | "tenant";
export interface IUserAuth extends Document {
    email: string;
    password: string;
    termsAndCondition: boolean;
    role: userRole;
    isVerified: boolean;
    otp?: string;
    otpExpiresAt?: Date;
    resetPasswordOtp?: string;
    resetPasswordOtpExpiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
declare const userAuth: mongoose.Model<IUserAuth, {}, {}, {}, Document<unknown, {}, IUserAuth, {}, mongoose.DefaultSchemaOptions> & IUserAuth & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUserAuth>;
export default userAuth;
//# sourceMappingURL=user.model.d.ts.map