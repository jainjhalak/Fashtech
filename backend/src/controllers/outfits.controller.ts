import { Response } from "express";
import { db } from "../db";
import { outfits, outfitPieces } from "../db/schema";
import { eq } from "drizzle-orm";
import { AuthRequest } from "../middlewares/auth.middleware";
// Create Outfit
export const createOutfit = async (req: AuthRequest, res: Response) => {
try {
if (!req.user) return res.status(401).json({ message: "Unauthorized" });
const { name, description, styleCategory, coverImage, pieces } = req.body;
const isAdmin = req.user.role === "admin";

const newOutfit = await db.insert(outfits).values({
  name,
  description,
  styleCategory,
  coverImage,
  createdBy: req.user.id,
  isFeatured: isAdmin,
  visibility: isAdmin ? "public" : "private"
}).returning();

const outfitId = newOutfit[0].id;

const pieceData = pieces.map((p: any) => ({
  outfitId,
  productId: p.productId,
  label: p.label
}));

await db.insert(outfitPieces).values(pieceData);

return res.status(201).json({ outfit: newOutfit[0] });
} catch (error) {
console.error(error);
return res.status(500).json({ message: "server error", error });
}
};
// Get all outfits
export const getOutfits = async (req: AuthRequest, res: Response) => {
try {
const result = await db.select().from(outfits);
return res.status(200).json({ outfits: result });
} catch (error) {
console.error(error);
return res.status(500).json({ message: "server error", error });
}
};
// Get outfit by ID
export const getOutfitById = async (req: AuthRequest, res: Response) => {
try {
const { id } = req.params as { id: string };
const outfit = await db.select().from(outfits).where(eq(outfits.id, id));
const pieces = await db.select().from(outfitPieces).where(eq(outfitPieces.outfitId, id));
return res.status(200).json({ outfit: outfit[0], pieces });
} catch (error) {
console.error(error);
return res.status(500).json({ message: "server error", error });
}
};
// Update outfit
export const updateOutfit = async (req: AuthRequest, res: Response) => {
try {
const { id } = req.params as { id: string };
const { name, description, styleCategory, coverImage, visibility } = req.body;

const updated = await db.update(outfits)
  .set({ name, description, styleCategory, coverImage, visibility })
  .where(eq(outfits.id, id))
  .returning();

return res.status(200).json({ outfit: updated[0] });
} catch (error) {
console.error(error);
return res.status(500).json({ message: "server error", error });
}
};
// Delete outfit
export const deleteOutfit = async (req: AuthRequest, res: Response) => {
try {
if (!req.user) return res.status(401).json({ message: "Unauthorized" });

const { id } = req.params as { id: string };
const outfit = await db.query.outfits.findFirst({ where: eq(outfits.id, id) });

if (!outfit) return res.status(404).json({ message: "Outfit not found" });

if (outfit.createdBy !== req.user.id && req.user.role !== "admin") {
  return res.status(403).json({ message: "Access denied" });
}

// ✅ Cascade will automatically delete linked outfit_pieces
await db.delete(outfits).where(eq(outfits.id, id));

return res.status(200).json({ message: "Outfit deleted" });
} catch (error) {
console.error(error);
return res.status(500).json({ message: "server error", error });
}
};
// Featured outfits
export const getFeaturedOutfits = async (req: AuthRequest, res: Response) => {
try {
const result = await db.select().from(outfits).where(eq(outfits.isFeatured, true));
return res.status(200).json({ outfits: result });
} catch (error) {
console.error(error);
return res.status(500).json({ message: "server error", error });
}
};
// Public outfits
export const getPublicOutfits = async (req: AuthRequest, res: Response) => {
try {
const result = await db.select().from(outfits).where(eq(outfits.visibility, "public"));
return res.status(200).json({ outfits: result });
} catch (error) {
console.error(error);
return res.status(500).json({ message: "server error", error });
}
};