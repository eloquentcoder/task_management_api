import { Request, Response } from "express"
import Task from "../models/task.model"
import { AuthRequest } from "../middleware/auth.middlware"
import redis from "../../config/redis";
import { io } from "../../websocket";

const index = async (req: AuthRequest, res: Response): Promise<void> => {
    const tasks = await Task.findAll({ where: { userId: req.user?.id } })
    res.status(200).json({ message: "Tasks fetched successfully", tasks })
}

const view = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const cacheKey = `task:${id}`;

    try {
        const cachedTask = await redis.get(cacheKey);

        if (cachedTask) {
            console.log("Serving from cache");
            res.status(200).json({message: "Task fetched successfully" , task: JSON.parse(cachedTask)});
            return;
        }

        const task = await Task.findByPk(id);
        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }

        await redis.set(cacheKey, JSON.stringify(task), "EX", 3600);

        res.status(200).json({ message: "Task fetched successfully", task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const post = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { title, description, status } = req.body

        const task = await Task.create({
            title,
            description,
            isDone: status === "done",
            userId: req.user?.id
        })

        io.to(req.user?.id as string).emit("taskCreated", { message: "New task created", task });

        res.status(201).json({ message: "Task created successfully", task })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}


const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, status } = req.body
        const { id } = req.params;

        const task = await Task.findByPk(id);
        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }

        task.title = title || task.title;
        task.description = description || task.description
        task.isDone = status === "done" || task.isDone;

        await task.save();

        io.to(task.userId.toString()).emit("taskUpdated", { message: "Task updated", task });

        // check if a cached version of the task exists and delete it to ensure the cache is updated
        const cacheKey = `task:${id}`;
        const cachedTask = await redis.get(cacheKey);

        if (cachedTask) {
            await redis.del(cacheKey);
        }

        res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

const destroy = async (req: Request, res: Response) => {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if (!task) {
        res.status(404).json({ error: "Task not found" });
        return;
    }

    // check if a cached version of the task exists and delete it to ensure the cache is updated
    const cacheKey = `task:${id}`;
    const cachedTask = await redis.get(cacheKey);

    if (cachedTask) {
        await redis.del(cacheKey);
    }

    io.to(task.userId.toString()).emit("taskDeleted", { message: "Task deleted", task });

    await task.destroy();

    res.status(200).json({ message: "Task deleted successfully" });

}


export default { index, view, post, update, destroy }