import mongoose, { Document, Schema } from "mongoose";

export interface IToken extends Document {
    token: string;
    tokenType: "temp | auth",
    expriedat: Date,
    userId: mongoose.Types.ObjectId,
}

const TokenSchema = new Schema<IToken>({
    token: { type:String, required: true},
    tokenType: { type:String, required: true},
    expriedat: { type:Date, required: true},
    userId: { type:Schema.Types.ObjectId, ref: "User" , required: true},
},
{timestamps: true}
)

export default mongoose.model<IToken>("Token", TokenSchema)