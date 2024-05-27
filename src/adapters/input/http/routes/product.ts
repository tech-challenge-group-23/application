import express, { Request, Response } from 'express';
import { provideProductController } from "@/adapters/input/http/controllers/product";
import multer from 'multer';


export const productRoutes = express.Router();

const upload = multer();

productRoutes.post("/", upload.single('image'), (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Product']
    #swagger.summary = 'Returns a created product.'
    #swagger.description = 'This endpoint will return a product json.'
  */
  provideProductController.createProduct(req, res)});

productRoutes.delete("/:id", (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Product']
    #swagger.summary = 'Returns a boolean.'
    #swagger.description = 'This endpoint will return a boolean for the deleted product.'
  */
  provideProductController.deleteProduct(req, res)});

productRoutes.get("/categories/:id", (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Product']
    #swagger.summary = 'Returns the list of products by category.'
    #swagger.description = 'This endpoint will return the list of products by category.'
  */
  provideProductController.listProductsByCategory(req, res)});
