import { Router } from "express";
import TaskController from "../app/controllers/tasks.controller";
import { authMiddleware } from "../app/middleware/auth.middlware";
import { createTaskValidator, updateTaskValidator } from "../app/validators/task.validator";


const router = Router();

router.use(authMiddleware);

router.get("/", TaskController.index);
router.get("/:id", TaskController.view);
router.post("/", createTaskValidator, TaskController.post);
router.put("/:id/update",updateTaskValidator ,TaskController.update);
router.delete("/:id/delete", TaskController.destroy);


export default router;