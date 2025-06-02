import { Router } from "express";
import { moviesController } from "../di/movies.di";
import { authMiddleware } from "../../../shared/middlewares/auth.middleware";
import { optionalAuthMiddleware } from "../../../shared/middlewares/optionalAuth.middleware";

const router = Router();

router.get("/search", optionalAuthMiddleware, moviesController.getMovies);
router.post("/favourite", authMiddleware, moviesController.toggleFavourite);

export default router;
