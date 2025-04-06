import mongoose from "mongoose";

export interface IToken {
    token: string;
    tokenType: "temp | auth",
    expriedat: Date,
    userId: mongoose.Types.ObjectId,
}