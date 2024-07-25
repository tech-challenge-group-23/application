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
      const product = new Product(
        req.body.categoryId,
        req.body.name,
        req.body.description,
        req.body.price,
        req.file!.buffer,
      )

      const serviceRes = await this.productService.create(product);
      if (serviceRes.errorMessage !== undefined) {
        return res.status(500).send(serviceRes);
      }
      if (!serviceRes.created) {
        return res.status(400).json({ message: serviceRes.message });
      }

      return res.sendStatus(201);
    } catch (error) {
      if (error instanceof Error) {
        return res.sendStatus(500);
      }
      throw error;
    }
  }

  async editProduct(req: Request, res: Response): Promise<Response> {
    try {
      const product = new Product(
        req.body.categoryId,
        req.body.name,
        req.body.description,
        req.body.price,
        req.file?.buffer,
      )
      const productResponse = await this.productService.edit(product);

      if (productResponse.errorMessage) {
        return res.status(500).json({ message: 'An unexpected error occurred' });
      }

      if (!productResponse.wasFound) {
        return res.status(404).json({ message: productResponse.message });
      }

      return res.sendStatus(200);
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
      if (!serviceRes.isValid) {
        return res.status(400).send({ message: serviceRes.message });
      }

      if (!serviceRes.wasFound) {
        return res.status(404).send({ message: serviceRes.message });
      }

      return res.status(200).send({ message: serviceRes.message });
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
