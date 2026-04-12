import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { getCanvasOutfitById, getCanvasOutfits, saveCanvasOutfit, updateCanvasOutfit } from "../controllers/canvas.controller";

const router = Router()

router.get("/", isAuthenticated, getCanvasOutfits)
router.get("/:id", isAuthenticated, getCanvasOutfitById)
router.post("/", isAuthenticated, saveCanvasOutfit)
router.patch("/:id", isAuthenticated, updateCanvasOutfit)

export default router