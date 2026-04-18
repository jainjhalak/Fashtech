import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request with user info
export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

// ✅ Authentication middleware
export const isAuthenticated: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
    (req as AuthRequest).user = { id: decoded.id, role: decoded.role };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Admin-only guard
export const isAdmin: RequestHandler = (req, res, next) => {
  const user = (req as AuthRequest).user;
  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

// ✅ Brand-only guard
export const isBrand: RequestHandler = (req, res, next) => {
  const user = (req as AuthRequest).user;
  if (!user || user.role !== "brand") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
