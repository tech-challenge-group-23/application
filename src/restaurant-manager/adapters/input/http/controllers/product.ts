import { Product } from '@/restaurant-manager/domain/entities/product';
import { provideProductService } from '@/restaurant-manager/domain/services/product';
import { ProductControllerPort } from '@/restaurant-manager/ports/controllers/product';
import { ProductServicePort } from '@/restaurant-manager/ports/services/product';
import { DefaultHttpResponse } from '@/restaurant-manager/ports/utils/response';
import { Request, Response } from 'express';

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
        req.body.price,
        req.body.description,
        req.file?.buffer,
      )

      const serviceRes = await this.productService.create(product);
      if (serviceRes.error !== undefined) {
        return res.status(500).send(serviceRes);
      }
      if (!serviceRes.created) {
        return res.status(400).json({ message: serviceRes.message });
      }

      return res.sendStatus(201);
    } catch (error) {
      console.log(error)
      return res.sendStatus(500)
    }
  }

  async editProduct(req: Request, res: Response): Promise<Response> {
    try {
      const product = new Product(
        req.body.categoryId,
        req.body.name,
        req.body.price,
        req.body.description,
        req.file?.buffer,
        Number(req.params?.id),
      )

      const productResponse = await this.productService.edit(product);

      if (productResponse.error) {
        return res.status(500).json({ message: productResponse.error });
      }

      if (!productResponse.wasFound) {
        return res.status(404).json({ message: productResponse.message });
      }

      return res.sendStatus(200);
    } catch (error) {
      console.log(error)
      return res.sendStatus(500)
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
      console.log(error)
      return res.sendStatus(500)
    }
  }

  async listProductsByCategory(req: Request, res: Response): Promise<Response> {
    try {
      const serviceRes = await this.productService.listByCategory(Number(req.params.id));

      return res.status(200).json(serviceRes.products);
    } catch (error) {
      console.log(error)
      return res.sendStatus(500)
    }
  }
}

export const provideProductController = new ProductController();
