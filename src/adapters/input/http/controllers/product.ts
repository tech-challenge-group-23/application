import { ProductControllerPort } from "@/ports/controllers/product";
import { ProductServicePort } from "@/ports/services/product";
import { Product } from "@/domain/entities/product";
import { Request, Response } from 'express';
import { provideProductService } from "@/domain/services/product"

export class ProductController implements ProductControllerPort {
    private ps: ProductServicePort
    
    constructor() {
      this.ps = provideProductService
    }
  
    async createProduct(req: Request, res: Response) {
      try {
        const product: Product = {
          categoryId: req.body.categoryId,
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          image: req.file?.buffer,
        }

      const serviceRes = await this.ps.create(product)
      if (serviceRes.created) {
        return res.status(201).send()
      }

      return res.status(400).json(serviceRes)
      } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: error.message });
      }
    }
  }


  export const provideProductController = new ProductController();

