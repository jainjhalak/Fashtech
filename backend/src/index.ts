import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import 'dotenv/config';
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import authRoutes from "./routes/auth.routes"
import brandRoutes from "./routes/brand.route"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT;


app.use("/api/auth", authRoutes)
app.use("/api/brand", brandRoutes)

app.listen(PORT, () => {
    console.log(`server running port ${PORT}`)
})

