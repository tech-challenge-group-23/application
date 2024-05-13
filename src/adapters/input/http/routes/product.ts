import express, { Request, Response } from 'express';
import { provideProductController } from "@/adapters/input/http/controllers/product";
import { multer } from "multer";


export const productRoutes = express.Router();

var upload = multer();

productRoutes.post("/", upload.array(), (req: Request, res: Response) => {provideProductController.createProduct(req, res)});

