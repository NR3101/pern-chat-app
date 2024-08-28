import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma.js";

interface DecodedToken extends JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
      };
    }
  }
}

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    // If token is not present, return an error
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No token" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    // If token is invalid, return an error
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    // Find the user with the decoded userId
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        fullName: true,
        profilePic: true,
      },
    });

    // If user is not found, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Set the user in the request object
    req.user = user;

    // Call the next middleware
    next();
  } catch (error: any) {
    console.log("Error in protectRoute middleware:", error.message);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;
