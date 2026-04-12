import { Router } from "express"
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware"
import { placeOrder, getUserOrders, getOrderById, updateOrderStatus } from "../controllers/orders.controller"

const router = Router()

router.post("/", isAuthenticated, placeOrder)
router.get("/", isAuthenticated, getUserOrders)
router.get("/:id", isAuthenticated, getOrderById)
router.patch("/:id/status", isAuthenticated, isAdmin, updateOrderStatus)

export default router