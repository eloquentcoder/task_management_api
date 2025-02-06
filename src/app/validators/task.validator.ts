import { NextFunction, Request, Response } from 'express';
import {z} from 'zod';

const createTaskSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().optional(),
    status: z.enum(['done', 'not done']),
})

const updateTaskSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long").optional(),
    description: z.string().optional(),
    status: z.enum(["done", "not done"]).optional(),
  });

export const createTaskValidator = (req: Request, res: Response, next: NextFunction) => {
    const result = createTaskSchema.safeParse(req.body);

    if (!result.success) {
        // If validation fails, send a 400 response with error details and don't call next()
        console.log(result.error.errors);
        const formattedErrors = result.error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
        }));
        res.status(422).json({ errors: formattedErrors });
        return;
    }

    // If validation passes, call next() to proceed to the next middleware/route handler
    next();

}


export const updateTaskValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = updateTaskSchema.safeParse(req.body);

  if (!result.success) {
    const formattedErrors = result.error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    if (process.env.NODE_ENV !== "production") {
      console.error("Validation Errors:", formattedErrors);
    }

    res.status(422).json({ errors: formattedErrors });
    return;
  }

  next(); // Proceed if validation passes
};
