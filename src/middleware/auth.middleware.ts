import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { decode } from "node:punycode";


export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({
                success: false,
                message: "auth token is required"
            });
            return
        }

        const token = authHeader.startsWith("Bearer") ? authHeader.split(" ")[1] : null;

        if (!token) {
            res.status(401).json({
                success: false,
                message: "Invalid auth format"
            })
        }

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            res.status(500).json({
                success: false,
                message: "JWT secret is not configured",
            })
            return
        }

        const decoded = jwt.verify(token!, secret) as {
            id: string;
            email: string;
            role: string;
        }

        (req as any).user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        }

        next()
        
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "invalid or expired token"
        })
    }
}