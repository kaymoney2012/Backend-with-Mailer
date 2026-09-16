import mongoose from "mongoose";
export interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
}
declare const userModel: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default userModel;
//# sourceMappingURL=authMode.d.ts.map