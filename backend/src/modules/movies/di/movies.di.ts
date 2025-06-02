import { MoviesController } from "../controller/movies.controller";
import { MoviesRepository } from "../repository/movies.repository";
import { MoviesService } from "../service/movies.service";

const moviesRepository = new MoviesRepository();
const moviesService = new MoviesService(moviesRepository);
const moviesController = new MoviesController(moviesService);

export { moviesController };
