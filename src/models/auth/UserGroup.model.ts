import mongoose, { Document, Schema } from "mongoose";

export interface IUserGroup extends Document{
    groupID: mongoose.Types.ObjectId,
    userID: mongoose.Types.ObjectId,
}

const UserGroupSchema = new Schema<IUserGroup>({
    groupID: {type: Schema.Types.ObjectId, ref: "Group", required: true},
    userID: {type: Schema.Types.ObjectId, ref: "User", required: true}
},
    {timestamps: true},
)

export default mongoose.model<IUserGroup>("UserGroup", UserGroupSchema);