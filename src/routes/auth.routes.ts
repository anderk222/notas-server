import { Router } from 'express';
import { auth_controller } from '../controllers';

const auth_router = Router();

auth_router.post('/register', auth_controller.register);
auth_router.post('/authenticate', auth_controller.authenticate );
auth_router.post('/verify', auth_controller.verify);

export { auth_router };