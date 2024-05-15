import { ProductControllerPort } from "@/ports/controllers/product";
import { ProductServicePort } from "@/ports/services/product";
import { Product } from "@/domain/entities/product";
import { Request, Response } from 'express';
import { provideProductService } from "@/domain/services/product"

export class ProductController implements ProductControllerPort {
    private productService: ProductServicePort
    
    constructor() {
      this.productService = provideProductService
    }
  
    async createProduct(req: Request, res: Response): Promise<Response>  {
      try {
        const product: Product = {
          categoryId: req.body.categoryId,
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          image: req.file?.buffer,
        }

      const serviceRes = await this.productService.create(product)
      if (serviceRes.created) {
        return res.sendStatus(201)
      }

      return res.status(400).json(serviceRes)
      } catch (error) {
        console.log(error)
        if (error instanceof Error){
          res.status(500).json({ error: error.message });
        }
        throw(error)
      }
    }

    async deleteProduct(req: Request, res: Response): Promise<Response>  {
      try {
        const serviceRes = await this.productService.delete(Number(req.params.id))

        if (serviceRes.errorMessage !== undefined){
          return res.status(500).send(serviceRes)
        }

        if (!serviceRes.isValid) {
          return res.sendStatus(400)
        }

        if (!serviceRes.wasFound){
          return res.sendStatus(404)
        }


        return res.sendStatus(200)
      } catch (error) {
        console.log(error)
        if (error instanceof Error){
          return res.status(500).json({ error: error.message });
        }
        throw(error)
      }
    }
  }

  export const provideProductController = new ProductController();

