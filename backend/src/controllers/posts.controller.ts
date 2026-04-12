import { Response } from "express"
import { db } from "../db"
import { posts, likes, comments } from "../db/schema"
import { eq } from "drizzle-orm"
import { AuthRequest } from "../middlewares/auth.middleware"

export const getPosts = async (req: AuthRequest, res: Response) => {
  try {
    const result = await db.select().from(posts)
    res.status(200).json({ posts: result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const getPostById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as { id: string }
    const post = await db.select().from(posts).where(eq(posts.id, id))
    res.status(200).json({ post: post[0] })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    const { canvasOutfitId, boardId, caption } = req.body
    const newPost = await db.insert(posts).values({
      userId: req.user!.id,
      canvasOutfitId,
      boardId,
      caption
    }).returning()
    res.status(201).json({ post: newPost[0] })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const likePost = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as { id: string }
    const result = await db.insert(likes).values({
      postId: id,
      userId: req.user!.id
    }).returning()
    res.status(201).json({ result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const unlikePost = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as { id: string }
    await db.delete(likes).where(eq(likes.postId, id))
    res.status(200).json({ message: "unliked" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const getComments = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as { id: string }
    const result = await db.select().from(comments).where(eq(comments.postId, id))
    res.status(200).json({ comments: result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const addComment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as { id: string }
    const { text } = req.body
    const newComment = await db.insert(comments).values({
      postId: id,
      userId: req.user!.id,
      text
    }).returning()
    res.status(201).json({ comment: newComment[0] })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const deleteComment = async (req: AuthRequest, res: Response) => {
  try {
    const { commentId } = req.params as { commentId: string }
    await db.delete(comments).where(eq(comments.id, commentId))
    res.status(200).json({ message: "deleted" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}