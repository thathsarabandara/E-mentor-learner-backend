import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document{
    name: string;
    description: string;
}

const categorySchema = new Schema<ICategory>({
    name:{
        type: String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    }
},
    {timestamps:true}
)

const category = mongoose.model<ICategory>("Category", categorySchema);

export default category;