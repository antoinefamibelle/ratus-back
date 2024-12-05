import { Request } from 'express';

export interface User {
    id: string;
    profilPictureId: string;
    profilColorId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserResponse {
    success: boolean;
    data?: User;
    message: string;
    error?: string;
}

export interface CustomRequest extends Request {
    userId?: string;
}
