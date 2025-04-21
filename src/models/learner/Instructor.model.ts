import mongoose, { Document, Schema } from "mongoose";

interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
}

interface Education {
  institution: string;
  degree?: string;
  field?: string;
  startYear?: number;
  endYear?: number;
}

interface Experience {
  institution?: string;
  role?: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
}

export interface IInstructor extends Document {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  address: string;
  phoneNumber: string;
  profession: string;
  bio?: string;
  expertise: string[];
  userId: mongoose.Types.ObjectId;
  socialLinks?: SocialLinks;
  educations?: Education[];
  experiences?: Experience[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SocialLinksSchema = new Schema<SocialLinks>(
  {
    linkedin: String,
    twitter: String,
    github: String,
    website: String,
  },
  { _id: false }
);

const EducationSchema = new Schema<Education>(
  {
    institution: { type: String, required: true },
    degree: String,
    field: String,
    startYear: Number,
    endYear: Number,
  },
  { _id: false }
);

const ExperienceSchema = new Schema<Experience>(
  {
    institution: String,
    role: String,
    startDate: Date,
    endDate: Date,
    description: String,
  },
  { _id: false }
);

const InstructorSchema = new Schema<IInstructor>(
  {
    firstName: { type: String },
    lastName: { type: String },
    dateOfBirth: { type: Date },
    address: { type: String },
    phoneNumber: { type: String },
    profession: { type: String },
    bio: { type: String, maxlength: 1000 },
    expertise: { type: [String], default: [] },
    socialLinks: SocialLinksSchema,
    educations: [EducationSchema],
    experiences: [ExperienceSchema],
    isVerified: { type: Boolean, default: false },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Instructor = mongoose.model<IInstructor>("Instructor", InstructorSchema);

export default Instructor;
