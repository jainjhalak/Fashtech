import { Router } from "express"
import { isAuthenticated } from "../middlewares/auth.middleware"
import { getBoards, getBoardById, createBoard, updateBoard, addOutfitToBoard, removeOutfitFromBoard } from "../controllers/boards.controller"

const router = Router()

router.get("/", isAuthenticated, getBoards)
router.get("/:id", isAuthenticated, getBoardById)
router.post("/", isAuthenticated, createBoard)
router.patch("/:id", isAuthenticated, updateBoard)
router.post("/:id/outfits", isAuthenticated, addOutfitToBoard)
router.delete("/:id/outfits/:canvasOutfitId", isAuthenticated, removeOutfitFromBoard)

export default router