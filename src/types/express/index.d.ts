import { UserDocument } from "../../models/auth/User.model";
declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}
