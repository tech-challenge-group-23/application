import { ProductRepositoryPort } from '@/ports/postgres/product';
import { Product, ProductServiceResponse } from '../entities/product';
import { ProductServicePort } from '@/ports/services/product';
import { provideProductRepository } from '@/adapters/output/postgres/product';
import { isInt } from 'aux/helpers/validation';

export class ProductService implements ProductServicePort {
  private productRepo: ProductRepositoryPort;
  constructor() {
    this.productRepo = provideProductRepository;
  }

  async create(product: Product): Promise<ProductServiceResponse> {
    try {
      console.log("hereee")

      const existsProduct = await this.productRepo.existsProduct(product.name);
      if (existsProduct) {
        return {
          isValid: false,
          message: `product ${product.name} already exists.`,
        };
      }

      const productValidated = await product.validateProduct(product);
      if (productValidated.errorMessage !== undefined) {
        return { errorMessage: productValidated.errorMessage };
      }
      if (!productValidated.isValid) {
        return { created: false, isValid: productValidated.isValid, message: productValidated.message };
      }

      await this.productRepo.save(product);

      return { created: true, isValid: productValidated.isValid };
    } catch (error) {
      if (error instanceof Error) {
        return { errorMessage: error.message };
      }
      throw error;
    }
  }

  async delete(productId: number): Promise<ProductServiceResponse> {
    try {
      if (isInt(productId)) {
        return {
          isValid: false,
          message: 'Product ID must be a number',
        };
      }

      const repoRes = await this.productRepo.delete(productId);
      if (!repoRes) {
        return {
          wasFound: false,
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
      if (isInt(product.id)) {
        return {
          isValid: false,
          message: 'Product ID must be a number',
        };
      }

      const productDb = await this.productRepo.getById(Number(product.id));
      if (!productDb) {
        return { wasFound: false, message: 'Product not found' };
      }

      const productValidated = await product.validateProduct(product);
      if (productValidated.errorMessage !== undefined) {
        return { errorMessage: productValidated.errorMessage };
      }
      if (!productValidated.isValid) {
        return { created: false, isValid: productValidated.isValid, message: productValidated.message };
      }

      await this.productRepo.edit(product);

      return { message: 'Product edited' };
    } catch (error) {
      if (error instanceof Error) {
        return { errorMessage: error.message };
      }
      throw error;
    }
  }

  async listByCategory(categoryId: number): Promise<ProductServiceResponse>  {
    try {
      if (isInt(categoryId)) {
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
