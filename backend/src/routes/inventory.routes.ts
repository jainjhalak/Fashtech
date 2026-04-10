import { Router } from "express";
import { addToInventory, getInventory, removeFromInventory } from "../controllers/inventory.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router()

router.get("/", isAuthenticated, getInventory)
router.post("/", isAuthenticated, addToInventory)
router.delete("/:productId", isAuthenticated, removeFromInventory)

export default router