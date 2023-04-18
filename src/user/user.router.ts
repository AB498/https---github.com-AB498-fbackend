import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as UserService from './user.service';

export const userRouter = express.Router();

userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const users = await UserService.listUsers();
        res.status(200).send(users);
    }
    catch (e: any) {
        res.status(500).send(e.message);
    }
});
userRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await UserService.getUser(parseInt(req.params.id));
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(404).send('User not found');
        }
    }
    catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.post('/', [
    body('firstName').isString(),
    body('lastName').isString(),
    body('email').isEmail(),
    body('password').isString()
], async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } ``
        const user = await UserService.createUser(req.body);
        res.status(201).send(user);
    }
    catch (e: any) {
        res.status(500).send(e.message);
    }
}
);

userRouter.put('/:id', [
    body('firstName').isString(),
    body('lastName').isString(),
    body('email').isEmail(),
    body('password').isString()
], async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user = await UserService.updateUser(parseInt(req.params.id), req.body);
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(404).send('User not found');
        }
    }
    catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const user = await UserService.deleteUser(parseInt(req.params.id));
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(404).send('User not found');
        }
    }
    catch (e: any) {
        res.status(500).send(e.message);
    }
});

