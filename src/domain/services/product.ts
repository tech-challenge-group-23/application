import { ProductRepositoryPort } from '@/ports/postgres/product';
import { Product, ProductServiceResponse } from '../entities/product';
import { ProductServicePort } from '@/ports/services/product';
import { provideProductRepository } from '@/adapters/output/postgres/product';
import { isNull, isInt, isString, validation } from 'aux/helpers/validation';
import { DefaultHttpResponse } from '@/ports/utils/response';

export class ProductService implements ProductServicePort {
  private productRepo: ProductRepositoryPort;
  constructor() {
    this.productRepo = provideProductRepository;
  }

  async create(product: Product): Promise<ProductServiceResponse> {
    try {
      const productValited = await this.validateProduct(product);

      if (productValited.errorMessage !== undefined) {
        return { errorMessage: productValited.errorMessage };
      }

      if (!productValited.isValid) {
        return { created: false, isValid: productValited.isValid, message: productValited.message };
      }

      await this.productRepo.save(product);

      return { created: true, isValid: productValited.isValid };
    } catch (error) {
      if (error instanceof Error) {
        return { errorMessage: error.message };
      }
      throw error;
    }
  }

  async delete(productId: number): Promise<DefaultHttpResponse> {
    try {
      if (isNaN(productId)) {
        return {
          message: 'Product ID must be a number',
          status: 400,
        };
      }

      const repoRes = await this.productRepo.delete(productId);

      if (!repoRes) {
        return {
          message: `product ${productId} was not found`,
          status: 404,
        };
      }

      return {
        message: 'Product deleted successfully',
        status: 200,
      };
    } catch (error) {
      if (error instanceof Error) {
        return { message: error.message, status: 500 };
      }
      throw error;
    }
  }

  async edit(productId: number, product: Partial<Product>): Promise<DefaultHttpResponse> {
    try {
      const productRepo = await this.productRepo.edit(productId, product);

      return productRepo;
    } catch (error) {
      if (error instanceof Error) {
        return {
          status: 500,
          message: error.message,
        };
      }

      throw error;
    }
  }

  async listByCategory(categoryId: number): Promise<{ products: Product[] }> {
    try {
      if (isNaN(categoryId)) {
        throw {
          message: 'Product ID must be a number',
          status: 400,
        };
      }

      const products = await this.productRepo.listByCategory(categoryId);

      return { products };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw error;
    }
  }

  private async validateProduct(product: Product): Promise<validation> {
    try {
      const existsProduct = await this.productRepo.existsProduct(product.name);

      if (existsProduct) {
        return {isValid: false,
          message: `product ${product.name} already exists.`
        }
      }

      if (!isInt(product.categoryId) || product.name == null) {
        return {
          isValid: false,
          message: 'invalid categoryId',
        };
      }
      if (!isString(product.name) || product.name == null) {
        return {
          isValid: false,
          message: 'invalid name',
        };
      }
      if (product.description !== undefined) {
        if (!isString(product.description)) {
          return {
            isValid: false,
            message: 'invalid description',
          };
        }
      }

      if (!isFinite(product.price) || !isNull(product.price) || product.price < 0) {
        return {
          isValid: false,
          message: 'invalid price',
        };
      }

      return { isValid: true };
    } catch (error) {
      if (error instanceof Error) {
        return { errorMessage: error.message };
      }
      throw error;
    }
  }
}

export const provideProductService = new ProductService();
