import { ProductServicePort } from '@/restaurant-manager/ports/services/product';
import { Product, ProductServiceResponse } from '../entities/product';
import { isInt } from 'aux/helpers/validation';
import { ProductRepositoryPort } from '@/restaurant-manager/ports/postgres/product';
import { provideProductRepository } from '@/restaurant-manager/adapters/output/postgres/product';

export class ProductService implements ProductServicePort {
  private productRepo: ProductRepositoryPort;
  constructor() {
    this.productRepo = provideProductRepository;
  }

  async create(product: Product): Promise<ProductServiceResponse> {
    try {
      const existsProduct = await this.productRepo.existsProduct(product.name);
      if (existsProduct) {
        return {
          isValid: false,
          message: `product ${product.name} already exists.`,
        };
      }

      const productValidated = await product.validateProduct(product);
      if (productValidated.errorMessage !== undefined) {
        return { error: productValidated.errorMessage };
      }
      if (!productValidated.isValid) {
        return { created: false, isValid: productValidated.isValid, message: productValidated.message };
      }

      await this.productRepo.save(product);

      return { created: true, isValid: productValidated.isValid };
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      }
      throw error;
    }
  }

  async delete(productId: number): Promise<ProductServiceResponse> {
    try {
      if (!isInt(productId)) {
        return {
          message: 'Product ID must be a number',
        };
      }

      const repoRes = await this.productRepo.delete(productId);
      if (!repoRes) {
        return {
          message: `product ${productId} was not found`,
        };
      }

      return {
        message: 'Product deleted successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        return { message: error.message};
      }
      throw error;
    }
  }

  async edit(product: Product): Promise<ProductServiceResponse>  {
    try {
      if (!isInt(product.id)) {
        return {
          message: 'Product ID must be a number',
        };
      }

      const existsProduct = await this.productRepo.existsProductID(Number(product.id));
      if (!existsProduct) {
        return { wasFound: false, message: 'Product not found' };
      }

      const productValidated = await product.validateProduct(product);
      if (productValidated.errorMessage !== undefined) {
        return { error: productValidated.errorMessage };
      }
      if (!productValidated.isValid) {
        return { created: false, isValid: productValidated.isValid, message: productValidated.message };
      }

      await this.productRepo.edit(product);

      return { message: 'Product edited' };
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      }
      throw error;
    }
  }

  async listByCategory(categoryId: number): Promise<ProductServiceResponse>  {
    try {
      if (!isInt(categoryId)) {
        throw {
          message: 'Product ID must be a number',
          isValid: false
        };
      }

      const products = await this.productRepo.listByCategory(categoryId);

      return { products: products };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw error;
    }
  }
}

export const provideProductService = new ProductService();
