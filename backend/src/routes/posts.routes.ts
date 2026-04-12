import { Router } from "express"
import { isAuthenticated } from "../middlewares/auth.middleware"
import { getPosts, getPostById, createPost, likePost, unlikePost, getComments, addComment, deleteComment } from "../controllers/posts.controller"

const router = Router()

router.get("/", getPosts)
router.get("/:id", getPostById)
router.post("/", isAuthenticated, createPost)
router.post("/:id/like", isAuthenticated, likePost)
router.delete("/:id/like", isAuthenticated, unlikePost)
router.get("/:id/comments", getComments)
router.post("/:id/comments", isAuthenticated, addComment)
router.delete("/:id/comments/:commentId", isAuthenticated, deleteComment)

export default router