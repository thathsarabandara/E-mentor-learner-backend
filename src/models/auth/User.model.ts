import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema<IUser>({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String , required: true},
},
    {timestamps: true}
);

export default mongoose.model("User", UserSchema)