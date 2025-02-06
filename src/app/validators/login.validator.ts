import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const loginValidator = (req: Request, res: Response, next: NextFunction): void => {
    // Parse and validate the request body against the schema
    const result = loginSchema.safeParse(req.body);

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
};