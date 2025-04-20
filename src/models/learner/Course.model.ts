import mongoose, { Document, Schema } from "mongoose";

// Embedded interfaces
interface ILearningOutcomes {
  description: string;
}

interface ICourseFor {
  description: string;
}

interface IRequirements {
  description: string;
}

interface ISubModules {
  order: number;
  title: string;
  videoUrl: string;
  lectureDes: string;
  lectureNote: string;
}

interface IModules {
  order: number;
  title: string;
  subModule?: ISubModules[];
}

// Course interface
export interface ICourse extends Document {
  instructorId: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  title: string;
  subtitle: string;
  price: number;
  duration: number;
  level: "Beginner" | "Intermediate" | "Expert";
  language: string;
  subtitleLang: string;
  description: string;
  learningOutcomes?: ILearningOutcomes[];
  courseFor?: ICourseFor[];
  requirements?: IRequirements[];
  videoURL: string;
  thumbnailUrl: string;
  review: mongoose.Types.ObjectId[];
  modules: IModules[];
  date: Date;
  published: boolean;
}

// Schemas for nested fields
const LearningOutcomeSchema = new Schema<ILearningOutcomes>(
  {
    description: { type: String, required: true },
  },
  { _id: false }
);

const CourseForSchema = new Schema<ICourseFor>(
  {
    description: { type: String, required: true },
  },
  { _id: false }
);

const RequirementsSchema = new Schema<IRequirements>(
  {
    description: { type: String, required: true },
  },
  { _id: false }
);

const SubModuleSchema = new Schema<ISubModules>(
  {
    order: { type: Number, required: true },
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    lectureDes: { type: String, required: true },
    lectureNote: { type: String, required: true },
  },
  { _id: false }
);

const ModuleSchema = new Schema<IModules>(
  {
    order: { type: Number, required: true },
    title: { type: String, required: true },
    subModule: [SubModuleSchema],
  },
  { _id: false }
);

// Final Course Schema
const CourseSchema = new Schema<ICourse>(
  {
    instructorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Expert"],
      required: true,
    },
    language: { type: String, required: true },
    subtitleLang: { type: String, required: true },
    description: { type: String },
    learningOutcomes: [LearningOutcomeSchema],
    courseFor: [CourseForSchema],
    requirements: [RequirementsSchema],
    videoURL: { type: String },
    thumbnailUrl: { type: String },
    review: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    date: { type: Date, default: Date.now },
    modules: [ModuleSchema],
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Course = mongoose.model<ICourse>("Course", CourseSchema);

export default Course;
