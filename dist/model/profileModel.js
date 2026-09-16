import mongoose, { Schema } from "mongoose";
import { timeStamp } from "node:console";
const profileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
const profileModel = mongoose.model("user", profileSchema);
export default profileModel;
//# sourceMappingURL=profileModel.js.map