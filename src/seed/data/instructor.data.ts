import mongoose from "mongoose";

export const instructorData = [
  {
    firstName: "Thathsara",
    lastName: "Bandara",
    dateOfBirth: new Date("2002-09-19"),
    address: "Manawasampath Uyana, Kalahe, Wanchawala.",
    phoneNumber: "0720853016",
    profession: "Software Engineer",
    bio: "Experienced developer and instructor in AI, Web and Mobile Development.",
    expertise: ["AI", "Web Development", "Mobile Development"],
    userId: new mongoose.Types.ObjectId(), // Replace with an actual user ID if available
    socialLinks: {
      linkedin: "https://linkedin.com/in/thathsara",
      github: "https://github.com/thathsara",
      website: "https://thathsara.dev",
    },
    educations: [
      {
        institution: "University of Sri Jayewardenepura",
        degree: "BSc",
        field: "Software Engineering",
        startYear: 2021,
        endYear: 2025,
      },
    ],
    experiences: [
      {
        institution: "Open Source Community",
        role: "Contributor",
        startDate: new Date("2022-01-01"),
        endDate: new Date("2023-12-31"),
        description: "Worked on open-source MERN and AI-based projects.",
      },
    ],
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
