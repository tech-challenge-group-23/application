import express, { Request, Response } from 'express';
import { provideOrderController } from '../controllers/order';

export const orderRoutes = express.Router();

orderRoutes.post("/", (req: Request, res: Response) => {provideOrderController.createOrder(req, res)});
orderRoutes.get("/:id",  (req: Request, res: Response) => {provideOrderController.getOrderById(req, res)});
// orderRoutes.get("/",  (req: Request, res: Response) => {provideOrderController.getAll(req, res)});
// orderRoutes.get("/querystring.......",  (req: Request, res: Response) => {provideOrderController.get......(req, res)});
// orderRoutes.put("/:id/status/:status",  (req: Request, res: Response) => {provideOrderController.updateStatus(req, res)});
