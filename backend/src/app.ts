import "./shared/configs/dotenv"
import express from "express"
import authRoutes from "./modules/auth/route/auth.routes"
import movieRoutes from "./modules/movies/router/movies.routes"
import cookieParser from "cookie-parser"
import connectDB from "./shared/configs/mogodb"
import cors from "cors"
import { errorHandler } from "./shared/middlewares/error.middleware"

connectDB()

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json())
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/movies", movieRoutes)

app.use(errorHandler)

export default app