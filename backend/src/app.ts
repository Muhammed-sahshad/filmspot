import "./shared/configs/dotenv"
import express from "express"
import authController from "./modules/auth/route/auth.routes"
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

app.use("/api/auth", authController)

app.use(errorHandler)

export default app