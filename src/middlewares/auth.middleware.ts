import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../types/user.types';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers['user-id'];

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Missing user-id header',
            error: 'Authentication required'
        });
    }

    // Add userId to the request object
    (req as CustomRequest).userId = userId as string;
    next();
};
