import { Request, Response } from 'express';
import { UserService } from './userService';

const userService = new UserService();

export class UserController {
  // Route handler to create a user
  async createUser(req: Request, res: Response): Promise<void> {
    const { name, email } = req.body;
    const user = { name, email };

    try {
      await userService.createUser(user);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Route handler to get user by name
  async getUserByName(req: Request, res: Response): Promise<void> {
    const { name } = req.params;

    try {
      const user = await userService.getUserByName(name);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async isUserExists(req: Request, res: Response): Promise<void> {
    const {name}: any = req.params;

    try {
        const isExists = await userService.userExists(name);
        if(isExists) {
            res.status(200).json({message: 'User exists'})
        }
        else {
            res.status(404).json({message: "User does not exists"})
        }
    } catch (error: any) {
        res.status(500).json({error: error.message})
    }
  }
}
