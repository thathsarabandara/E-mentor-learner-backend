import mongoose, { Document, Schema } from "mongoose";

export interface IGroup extends Document{
    name: string;
    description: string;
}

const GroupSchema = new Schema<IGroup>({
    name: {type: String, required: true},
    description: {type: String, required: true},
},
    {timestamps: true}
)

export default mongoose.model<IGroup>("Group", GroupSchema)