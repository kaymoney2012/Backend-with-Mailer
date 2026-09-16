import mongoose from "mongoose";
export interface iProfile extends Document {
    name: string;
    email: string;
    age: number;
    country: string;
    createdAt: Date;
}
declare const profileModel: mongoose.Model<iProfile, {}, {}, {}, mongoose.Document<unknown, {}, iProfile, {}, mongoose.DefaultSchemaOptions> & iProfile & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, iProfile>;
export default profileModel;
//# sourceMappingURL=profileModel.d.ts.map