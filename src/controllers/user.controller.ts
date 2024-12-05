import { Request, Response } from 'express';
import { CustomRequest, UserResponse } from '../types/user.types';
import { db, users } from '../db';
import { eq } from 'drizzle-orm';

export class UserController {
    static async getMe(req: Request, res: Response<UserResponse>) {
        try {
            const { userId } = req as CustomRequest;

            const [user] = await db.select().from(users).where(eq(users.id, userId!));

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                    error: 'User does not exist'
                });
            }

            res.json({
                success: true,
                data: user,
                message: 'User information retrieved successfully'
            });
        } catch (error) {
            const err = error as Error;
            console.error(err);
            res.status(500).json({
                success: false,
                message: 'Error retrieving user information',
                error: err.message
            });
        }
    }

    static async createUser(req: Request, res: Response<UserResponse>) {
        try {
            const { profilPictureId, profilColorId } = req.body;

            if (!profilPictureId || !profilColorId) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields',
                    error: 'All fields are required: profilPictureId, profilColorId'
                });
            }

            const [user] = await db.insert(users).values({
                profilPictureId,
                profilColorId
            }).returning();

            res.json({
                success: true,
                data: user,
                message: 'User created successfully'
            });
        } catch (error) {
            const err = error as Error;
            console.error(err);
            res.status(500).json({
                success: false,
                message: 'Error creating user',
                error: err.message
            });
        }
    }
}
