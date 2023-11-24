import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

// USER ROUTERS
router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/:userId', UserController.getUser);
router.delete('/users/:userId', UserController.deleteUser);

export const UserRotues = router;
