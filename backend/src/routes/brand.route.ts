import { Router } from "express"
import { registerBrand, loginBrand } from "../controllers/brand.auth.controller"

const router = Router()

router.post("/register", registerBrand)
router.post("/login", loginBrand)

export default router