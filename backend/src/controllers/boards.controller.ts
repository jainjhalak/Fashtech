import { Response } from "express"
import { db } from "../db"
import { boards, boardOutfits } from "../db/schema"
import { eq } from "drizzle-orm"
import { AuthRequest } from "../middlewares/auth.middleware"

export const getBoards = async (req: AuthRequest, res: Response) => {
  try {
    const result = await db.select().from(boards).where(eq(boards.userId, req.user!.id))
    res.status(200).json({ boards: result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const getBoardById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as { id: string }
    const board = await db.select().from(boards).where(eq(boards.id, id))
    const outfits = await db.select().from(boardOutfits).where(eq(boardOutfits.boardId, id))
    res.status(200).json({ board: board[0], outfits })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const createBoard = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, coverImage } = req.body
    const newBoard = await db.insert(boards).values({
      userId: req.user!.id,
      name,
      description,
      coverImage
    }).returning()
    res.status(201).json({ board: newBoard[0] })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const updateBoard = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as { id: string }
    const { name, description, coverImage } = req.body
    const updated = await db.update(boards).set({ name, description, coverImage }).where(eq(boards.id, id)).returning()
    res.status(200).json({ board: updated[0] })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const addOutfitToBoard = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as { id: string }
    const { canvasOutfitId } = req.body
    const result = await db.insert(boardOutfits).values({
      boardId: id,
      canvasOutfitId
    }).returning()
    res.status(201).json({ result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const removeOutfitFromBoard = async (req: AuthRequest, res: Response) => {
  try {
    const { id, canvasOutfitId } = req.params as { id: string, canvasOutfitId: string }
    await db.delete(boardOutfits).where(eq(boardOutfits.canvasOutfitId, canvasOutfitId))
    res.status(200).json({ message: "removed" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}