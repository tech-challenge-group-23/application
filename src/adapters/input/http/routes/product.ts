import express, { Request, Response } from 'express';
import { provideProductController } from "@/adapters/input/http/controllers/product";
import multer from 'multer';


export const productRoutes = express.Router();

const upload = multer();

productRoutes.post("/", upload.single('image'), (req: Request, res: Response) => {provideProductController.createProduct(req, res)});
productRoutes.delete("/:id", (req: Request, res: Response) => {provideProductController.deleteProduct(req, res)});


