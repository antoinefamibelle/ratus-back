import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Apply auth middleware to all user routes
router.use(authMiddleware);

router.get('/me', UserController.getMe);

export default router;
