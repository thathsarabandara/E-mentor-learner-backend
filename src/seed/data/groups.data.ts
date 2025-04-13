import { IGroup } from "../../models/auth/Group.model";

export const groupData: IGroup[] = [
  {
    name: "Learner",
    description: "Group for all learners using the LMS platform.",
  } as IGroup,
  {
    name: "Teacher",
    description: "Group for all educators managing courses.",
  } as IGroup,
  {
    name: "Admin",
    description: "Group with full access to manage the system.",
  } as IGroup,
];
