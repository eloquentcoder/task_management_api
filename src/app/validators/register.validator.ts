import { NextFunction, Request, Response } from 'express';
import {z} from 'zod';

const registerSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
})

export const registerValidator = (req: Request, res: Response, next: NextFunction) => {
    const result = registerSchema.safeParse(req.body);

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
