import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isVerfied: boolean;
}

const UserSchema: Schema = new Schema<IUser>({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String , required: true},
    isVerfied: {type: Boolean, required: true, default: false},
},
    {timestamps: true}
);

const User = mongoose.model<IUser>("User", UserSchema)

export default User