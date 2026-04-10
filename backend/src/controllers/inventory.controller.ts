import { Request, Response } from "express";
import { db } from "../db";
import { inventory } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { AuthRequest } from "../middlewares/auth.middleware";

export const getInventory = async (req: AuthRequest, res: Response) => {
    try {
        const items = await db.select().from(inventory).where(eq(inventory.userId, req.user!.id))

        res.status(200).json({ items })

    } catch (error) {
        res.status(500).json({ message: "server error", error })
    }
}

export const addToInventory = async (req: AuthRequest, res: Response) => {
    try {
        const { productId, sourceOutfitId } = req.body
        const items = await db.insert(inventory).values({ userId: req.user!.id, productId, sourceOutfitId }).returning()

        res.status(200).json({ items })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error", error })
    }
}

export const removeFromInventory = async (req: AuthRequest, res: Response) => {
    try {
        const { productId } = req.params as {productId: string}
        const items = await db.delete(inventory).where(and(eq(inventory.productId, productId), eq(inventory.userId, req.user!.id)))

        res.status(200).json({ items })

    } catch (error) {
        res.status(500).json({ message: "server error", error})
    }
}