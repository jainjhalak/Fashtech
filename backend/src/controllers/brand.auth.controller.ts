import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { brands } from "../db/schema";
import { db } from "../db";

export const registerBrand = async (req: Request, res: Response) => {
    try {
        const {name, email, password} = req.body

        const existing = await db.select().from(brands).where(eq(brands.email, email))
        if (existing.length > 0) {
            return res.status(400).json({message: "Brand already exists"})
        }

        const hashed = await bcrypt.hash(password, 10)

        const newBrand = await db.insert(brands).values({
            name,
            email,
            password: hashed,
        }).returning()

        const token = jwt.sign(
            { id: newBrand[0].id, role:"brand" },
            process.env.JWT_SECRET!,
            {expiresIn: "7d"} 
        )

        res.status(201).json({ brand: newBrand[0], token })

    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}

export const loginBrand = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body

        const brand = await db.select().from(brands).where(eq(brands.email, email))
        if (brand.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign(
            {id: brand[0].id, role: "brand"},
            process.env.JWT_SECRET!,
            {expiresIn: "7d"}
        )

        res.status(200).json({ brand: brand[0], token })
    } catch (error) {
        res.status(500).json({ message: "Sever error", error })
    }
}