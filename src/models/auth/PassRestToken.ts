import mongoose, { Document, Schema } from "mongoose";

export interface IPassResetToken extends Document {
    token: string,
    expiredAt: Date,
    userId: mongoose.Types.ObjectId
}

export const PassResetTokenSchema = new Schema<IPassResetToken>({
    token:{
        type: String,
        required: true,
    },
    expiredAt:{
        type: Date,
        required: true,
        default:
    }
})