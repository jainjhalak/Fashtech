import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export interface AuthRequest extends Request {
  user?: { id: string; role: string }
}

export const isAuthenticated = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "No token provided" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string }
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ message: "Invalid token" })
  }
}

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied" })
  }
  next()
}

export const isBrand = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "brand") {
    return res.status(403).json({ message: "Access denied" })
  }
  next()
}