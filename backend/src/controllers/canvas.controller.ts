import { Response } from "express"
import { db } from "../db"
import { canvasOutfits, canvasLayers } from "../db/schema"
import { eq } from "drizzle-orm"
import { AuthRequest } from "../middlewares/auth.middleware"

export const getCanvasOutfits = async (req: AuthRequest, res: Response) => {
  try {
    const outfits = await db.select().from(canvasOutfits).where(eq(canvasOutfits.userId, req.user!.id))
    res.status(200).json({ outfits })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const getCanvasOutfitById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as {id: string}
    const outfit = await db.select().from(canvasOutfits).where(eq(canvasOutfits.id, id))
    const layers = await db.select().from(canvasLayers).where(eq(canvasLayers.canvasOutfitId, id))
    res.status(200).json({ outfit: outfit[0], layers })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const saveCanvasOutfit = async (req: AuthRequest, res: Response) => {
  try {
    const { name, previewImage, layers } = req.body

    const newOutfit = await db.insert(canvasOutfits).values({
      userId: req.user!.id,
      name,
      previewImage
    }).returning()

    const outfitId = newOutfit[0].id

    const layerData = layers.map((layer: any) => ({
      canvasOutfitId: outfitId,
      productId: layer.productId,
      positionX: layer.positionX,
      positionY: layer.positionY,
      zIndex: layer.zIndex,
      scale: layer.scale ?? "1"
    }))

    const savedLayers = await db.insert(canvasLayers).values(layerData).returning()

    res.status(201).json({ outfit: newOutfit[0], layers: savedLayers })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const updateCanvasOutfit = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as {id: string}
    const { name, previewImage, layers } = req.body

    await db.update(canvasOutfits).set({ name, previewImage }).where(eq(canvasOutfits.id, id))

    await db.delete(canvasLayers).where(eq(canvasLayers.canvasOutfitId, id))

    const layerData = layers.map((layer: any) => ({
      canvasOutfitId: id,
      productId: layer.productId,
      positionX: layer.positionX,
      positionY: layer.positionY,
      zIndex: layer.zIndex,
      scale: layer.scale ?? "1"
    }))

    const updatedLayers = await db.insert(canvasLayers).values(layerData).returning()

    res.status(200).json({ layers: updatedLayers })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}