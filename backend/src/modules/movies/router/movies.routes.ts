import { Router } from 'express';
import { MovieController } from '../controller/movies.controller';

const controller = new MovieController();
const router = Router();

router.get('/search', controller.getMovies);

export default router;
