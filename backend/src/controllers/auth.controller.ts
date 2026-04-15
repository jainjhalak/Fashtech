import { Request, Response } from "express"
import { db} from "../db"
import { eq } from "drizzle-orm"
import {users } from "../db/schema"
import bcrypt from  "bcryptjs"
import jwt from "jsonwebtoken"

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body

        //check if user exists
        const existing = await db.select().from(users).where(eq(users.email, email))
        if (existing.length > 0) {
            return res.status(400).json({ message: "User already exists"})
        }

        //hash password
        const hashed = await bcrypt.hash(password, 10)

        //insert user
        const newUser = await db.insert(users).values({
            username,
            email,
            password: hashed,
            role: "user"
        }).returning()

        //generate token
        const token = jwt.sign(
            {id: newUser[0].id, role: newUser[0].role },
            process.env.JWT_SECRET!,
            {expiresIn: "7d"}
        )

        res.status(201).json({ user: newUser[0], token })

    } catch (error) {
  console.log("🔥 ERROR:", error)
  return res.status(500).json({
    message: "Server error",
    error: error instanceof Error ? error.message : error,
  })
}
    }


export const loginUser = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body

        const user = await db.select().from(users).where(eq(users.email, email))
        if (user.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user[0].password)
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign(
            { id: user[0].id, role: user[0].role },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        )

        res.status(200).json({ user: user[0], token })

    } catch (error) {
  console.log("🔥 ERROR:", error)
  return res.status(500).json({
    message: "Server error",
    error: error instanceof Error ? error.message : error,
  })
}
}