import { NextFunction, Request, Response } from "express";
import Group from "models/auth/Group.model";
import Token from "models/auth/Token.model";
import User from "models/auth/User.model";
import UserGroup from "models/auth/UserGroup.model";

/**
 * Role-based Auth Middleware
 * @param role - Role name to check (e.g., "admin", "teacher")
 */
export const auth = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const token = req.cookies.authlearnertoken;

      if (!token) {
        return res.status(401).json({ message: "Token not found" });
      }

      const isValidToken = await Token.findOne({
        token,
        tokenType: "auth",
        expiredAt: { $gt: new Date() },
      });

      if (!isValidToken) {
        return res.status(401).json({ message: "Token expired or invalid" });
      }

      const user = await User.findOne({
        _id: isValidToken.userId,
        isVerified: true,
      });

      if (!user) {
        return res.status(404).json({ message: "User not found or not verified" });
      }

      const group = await Group.findOne({ name: role });

      if (!group) {
        return res.status(400).json({ message: "Invalid role/group" });
      }

      const userGroup = await UserGroup.findOne({
        groupID: group._id,
        userID: user._id,
      });

      if (!userGroup) {
        return res.status(403).json({ message: "Access denied: insufficient permissions" });
      }

      req.user = user; // Attach user info to request

      next();
    } catch (error) {
      console.error("Authorization middleware error:", error);
      return res.status(500).json({ message: "Server error during authentication" });
    }
  };
};
