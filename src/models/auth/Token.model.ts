import mongoose, { Document, Schema } from "mongoose";

export interface IToken extends Document {
    token: string;
    tokenType: "temp | auth",
    expriedAt: Date,
    userId: mongoose.Types.ObjectId,
}

const TokenSchema = new Schema<IToken>({
    token: { 
        type:String, 
        required: true
    },
    tokenType: { 
        type:String,
        enum: ['temp', 'auth'], 
        required: true
    },
    expriedAt: { 
        type:Date, 
        required: true,
        default: new Date(Date.now() + 2 * 3600 * 1000),
    },
    userId: { 
        type:Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
},
{timestamps: true}
)

const Token = mongoose.model('Token', TokenSchema);

export default Token;