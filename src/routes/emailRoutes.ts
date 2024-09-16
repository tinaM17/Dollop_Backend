import { Router } from 'express';
import { sendEmailController } from '../controllers/emailController';

const router = Router();

router.post('/sendEmail', sendEmailController);

export default router;
