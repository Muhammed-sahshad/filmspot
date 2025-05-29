import { AuthController } from "../controller/auth.controller";
import { AuthRepository } from "../repository/auth.repository";
import { AuthService } from "../service/auth.service";

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

export { authController };
