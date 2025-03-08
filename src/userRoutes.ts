import { Router } from 'express';
import { UserController } from './userController';

const router = Router();
const userController = new UserController();

// Route to create a user
router.post('/users', userController.createUser);

// Route to get a user by name
router.get('/users/:name', userController.getUserByName);

router.get('/users/check/:name', userController.isUserExists);

export default router;
