import { Router } from "express"
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware"
import { getAllUsers, deleteUser, getAllBrands, verifyBrand, deleteBrand } from "../controllers/admin.controller"

const router = Router()

router.get("/users", isAuthenticated, isAdmin, getAllUsers)
router.delete("/users/:id", isAuthenticated, isAdmin, deleteUser)
router.get("/brands", isAuthenticated, isAdmin, getAllBrands)
router.patch("/brands/:id/verify", isAuthenticated, isAdmin, verifyBrand)
router.delete("/brands/:id", isAuthenticated, isAdmin, deleteBrand)

export default router