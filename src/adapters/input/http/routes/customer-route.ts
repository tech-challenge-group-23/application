import express, { Request, Response } from 'express';
import { provideCustomerController } from '../controllers/customer-controller';

export const customerRoutes = express.Router();

customerRoutes.post("/", (req: Request, res: Response) => {provideCustomerController.createCustomer(req, res)});
customerRoutes.get("/:cpf",  (req: Request, res: Response) => {provideCustomerController.searchCustomerByCpf(req, res)});