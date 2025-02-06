import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export interface AuthRequest extends Request {
    user?: { id: string };
}


export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ error: "Authorization header is required" });
        return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        req.user = { id: decoded.id };
        next(); // M
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Invalid or expired token" });
    }
}
