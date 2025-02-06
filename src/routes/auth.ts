import { Router } from "express";
import AuthController from "../app/controllers/auth.controller"
import { loginValidator } from "../app/validators/login.validator";
import { registerValidator } from "../app/validators/register.validator";

const router = Router();

router.post("/login", loginValidator, AuthController.login);
router.post("/register",registerValidator, AuthController.register);

export default router;