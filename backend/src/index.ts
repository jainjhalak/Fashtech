import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import 'dotenv/config';
import authRoutes from "./routes/auth.routes"
import brandRoutes from "./routes/brand.route"
import inventoryRoutes from "./routes/inventory.routes"
import canvasRoutes from "./routes/canvas.route"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT;


app.use("/api/auth", authRoutes)
app.use("/api/brand", brandRoutes)
app.use("/api/inventory", inventoryRoutes)
app.use("/api/canvas", canvasRoutes)

app.listen(PORT, () => {
    console.log(`server running port ${PORT}`)
})

