import { ProductControllerPort } from "@/ports/controllers/product";
import { ProductServicePort } from "@/ports/services/product";
import { Product } from "@/domain/entities/product";
import { Request, Response } from 'express';
import { provideProductService } from "@/domain/services/product"

export class ProductController implements ProductControllerPort {
    constructor(private readonly ps: ProductServicePort) {
      this.ps = ps
    }
  
    async createProduct(req: Request, res: Response): Promise<void> {
      try {
      const product: Product = {
        categoryId: req.body.categoryId,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image
        }

      console.log("PRINTAVAAAAAAAAA", product)
      this.ps.create(product)

      } catch (error) {
        console.log("comes here error", error)
      }
    }
  }


  export const provideProductController = new ProductController(provideProductService);

