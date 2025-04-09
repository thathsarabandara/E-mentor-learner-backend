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
        default: Date.now()+ 20 * 60 * 1000
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

const PassResetToken = mongoose.model("PassResetToken", PassResetTokenSchema);

export default PassResetToken;