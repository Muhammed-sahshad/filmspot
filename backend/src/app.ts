import express from "express"
import moviesRoutes from "./routes/movie.routes"

const app = express()

app.use(express.json())

app.use("/api/movies", moviesRoutes)


export default app