import mongoose, { Document, Schema } from "mongoose";

export interface ILearner extends Document{
    firstName: String;
    lastName: String;
    dateOfBirth: Date;
    address: String;
    phoneNumber: String;
    proffesion: String;
    userId: mongoose.Types.ObjectId
}

export const LearnerSchema = new Schema<ILearner>({
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
        type:String,
        required: true,
    },
    dateOfBirth:{
        type:Date,
        required: true,
    },
    address:{
        type:String,
        required: true,
    },
    phoneNumber:{
        type:String,
        required: true,
    },
    proffesion:{
        type:String,
        required: true,
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}
,
{timestamps: true}
)

const Learner = mongoose.model<ILearner>("learner", LearnerSchema)

export default Learner;