import express, { Request, Response } from 'express';
import { provideOrderController } from '../controllers/order';

export const orderRoutes = express.Router();

orderRoutes.post("/", (req: Request, res: Response) => {provideOrderController.createOrder(req, res)});
