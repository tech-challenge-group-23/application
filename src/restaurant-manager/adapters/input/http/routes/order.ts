import express, { Request, Response } from 'express';
import { provideOrderController } from '../controllers/order';

export const orderRoutes = express.Router();

orderRoutes.get("/", (req: Request, res: Response) => { provideOrderController.getOrdersByStatusAndCustomer(req, res) });

orderRoutes.get("/all", (req: Request, res: Response) => { provideOrderController.getAllOrders(req, res) });

orderRoutes.get("/open-payments", (req: Request, res: Response) => { provideOrderController.getOrdersIDOpenPayments(req, res) });

orderRoutes.get("/:id", (req: Request, res: Response) => { provideOrderController.getOrderById(req, res) });

orderRoutes.post("/", (req: Request, res: Response) => { provideOrderController.createOrder(req, res) });

orderRoutes.put("/:id/status", (req: Request, res: Response) => { provideOrderController.updateStatus(req, res) });

orderRoutes.put("/:id/payment-status", (req: Request, res: Response) => { provideOrderController.updatePaymentStatus(req, res) });
