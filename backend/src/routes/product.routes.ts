import { Router } from "express"
import { isAuthenticated } from "../middlewares/auth.middleware"
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller"

const router = Router()

// PUBLIC ROUTES
router.get("/", getProducts)
router.get("/:id", getProductById)

// PROTECTED ROUTES
router.post("/", isAuthenticated, createProduct)
router.put("/:id", isAuthenticated, updateProduct)
router.delete("/:id", isAuthenticated, deleteProduct)

export default router