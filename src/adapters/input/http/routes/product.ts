import express, { Request, Response } from 'express';
import { provideProductController } from "@/adapters/input/http/controllers/product";

export const productRoutes = express.Router();

productRoutes.post("/", (req: Request, res: Response) => {provideProductController.createProduct(req, res)});

