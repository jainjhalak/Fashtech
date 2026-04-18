import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import 'dotenv/config';
import authRoutes from "./routes/auth.routes"
import brandRoutes from "./routes/brand.route"
import inventoryRoutes from "./routes/inventory.routes"
import canvasRoutes from "./routes/canvas.route"
import boardsRoute from "./routes/boards.routes"
import ordersRoutes from "./routes/orders.routes"
import postsRoutes from "./routes/posts.routes"
import adminRoutes from "./routes/admin.routes"
import productRoutes from "./routes/product.routes"
import outfitsRoutes from "./routes/outfits.routes"
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT;
app.use("/api/auth", authRoutes)
app.use("/api/brand", brandRoutes)
app.use("/api/inventory", inventoryRoutes)
app.use("/api/canvas", canvasRoutes)
app.use("/api/boards", boardsRoute)
app.use("/api/orders", ordersRoutes)
app.use("/api/posts", postsRoutes)
app.use("/api/products", productRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/outfits", outfitsRoutes);
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
})