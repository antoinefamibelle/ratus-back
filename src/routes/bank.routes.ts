import { Router } from 'express';
import { BankController } from '../controllers/bank.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Apply auth middleware to all bank routes
router.use(authMiddleware);

router.get('/list', BankController.getBankList);
router.post('/agreements', BankController.createAgreement);
router.post('/requisitions', BankController.createRequisition);
router.post('/token/new', BankController.createToken);
router.post('/token/refresh', BankController.refreshToken);

export default router;
