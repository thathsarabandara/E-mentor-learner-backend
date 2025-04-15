import mongoose, { Document, Schema } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  thumbnailUrl: string;
  category: string;
  instructorId: mongoose.Types.ObjectId;
  date: Date,
  published: boolean;
}

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String },
    thumbnailUrl: { type: String },
    category: { type: String },
    instructorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const course = mongoose.model<ICourse>("Course", CourseSchema);

export default course;