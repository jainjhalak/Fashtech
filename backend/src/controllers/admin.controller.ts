import { Response } from "express"
import { db } from "../db"
import { users, brands } from "../db/schema"
import { eq } from "drizzle-orm"
import { AuthRequest } from "../middlewares/auth.middleware"

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const result = await db.select().from(users)
    res.status(200).json({ users: result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as { id: string }
    await db.delete(users).where(eq(users.id, id))
    res.status(200).json({ message: "user deleted" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const getAllBrands = async (req: AuthRequest, res: Response) => {
  try {
    const result = await db.select().from(brands)
    res.status(200).json({ brands: result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const verifyBrand = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as { id: string }
    const updated = await db.update(brands).set({ isVerified: true }).where(eq(brands.id, id)).returning()
    res.status(200).json({ brand: updated[0] })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const deleteBrand = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as { id: string }
    await db.delete(brands).where(eq(brands.id, id))
    res.status(200).json({ message: "brand deleted" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}