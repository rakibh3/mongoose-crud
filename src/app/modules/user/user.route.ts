import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/:userId', UserController.getUser);

export const UserRotues = router;
