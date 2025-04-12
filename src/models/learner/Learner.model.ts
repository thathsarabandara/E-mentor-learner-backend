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
    },
    lastName:{
        type:String,
    },
    dateOfBirth:{
        type:Date,
    },
    address:{
        type:String,
    },
    phoneNumber:{
        type:String,
    },
    proffesion:{
        type:String,
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