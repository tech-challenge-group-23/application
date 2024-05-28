import { ProductControllerPort } from '@/ports/controllers/product';
import { ProductServicePort } from '@/ports/services/product';
import { Product } from '@/domain/entities/product';
import { Request, Response } from 'express';
import { provideProductService } from '@/domain/services/product';
import { DefaultHttpResponse } from '@/ports/utils/response';

export class ProductController implements ProductControllerPort {
  private productService: ProductServicePort;

  constructor() {
    this.productService = provideProductService;
  }

  async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const product: Product = {
        categoryId: req.body.categoryId,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.file?.buffer,
      };

      const serviceRes = await this.productService.create(product);

      if (serviceRes.errorMessage !== undefined) {
        return res.status(500).send(serviceRes);
      }

      if (!serviceRes.created) {
        return res.status(400).json({message: serviceRes.message});
      }

      return res.sendStatus(201);
    } catch (error) {
      if (error instanceof Error) {
        return res.sendStatus(500);
      }
      throw error;
    }
  }

  async editProduct(req: Request, res: Response): Promise<any> {
    try {
      const id = Number(req.params.id);
      const product: Partial<Product> = req.body;

      if (req.file) {
        product.image = req.file.buffer;
      }

      const productResponse = await this.productService.edit(id, product);

      return res.status(productResponse.status).send({ message: productResponse.message });
    } catch (error) {
      if (error instanceof Error) {
        return res.sendStatus(500);
      }
      throw error;
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
      const serviceRes = await this.productService.delete(Number(req.params.id));

      return res.status(serviceRes.status).send({ message: serviceRes.message });
    } catch (error) {
      if (error instanceof Error) {
        return res.sendStatus(500).send({ message: 'internal server error' });
      }
      throw error;
    }
  }

  async listProductsByCategory(req: Request, res: Response): Promise<Response> {
    try {
      const serviceRes = await this.productService.listByCategory(Number(req.params.id));

      return res.status(200).json(serviceRes.products);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).send({ message: error.message });
      }

      return res
        .status((error as DefaultHttpResponse).status)
        .send({ message: (error as DefaultHttpResponse).message });
    }
  }
}

export const provideProductController = new ProductController();
