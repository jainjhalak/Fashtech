import { Router } from "express";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware";
import {
createOutfit,
getOutfits,
getOutfitById,
updateOutfit,
deleteOutfit,
getFeaturedOutfits,
getPublicOutfits
} from "../controllers/outfits.controller";
const router = Router();
// Create outfit (user or admin)
router.post("/", isAuthenticated, createOutfit as any);
// Get all outfits
router.get("/", getOutfits as any);
// Featured outfits
router.get("/featured", getFeaturedOutfits as any);
// Public outfits
router.get("/public", getPublicOutfits as any);
// Get outfit by ID
router.get("/:id", getOutfitById as any);
// Update outfit
router.patch("/:id", isAuthenticated, updateOutfit as any);
// Delete outfit (only admin or creator)
router.delete("/:id", isAuthenticated, deleteOutfit as any);
export default router;