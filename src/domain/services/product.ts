import { ProductRepositoryPort } from "@/ports/postgres/product";
import { Product, ProductServiceResponse  } from "../entities/product";
import { ProductServicePort } from "@/ports/services/product";
import { provideProductRepository } from "@/adapters/output/postgres/product";
import { isNull, isInt, isString, validation } from "aux/helpers/validation";

  export class ProductService implements ProductServicePort {
    private productRepo: ProductRepositoryPort
    constructor() {
      this.productRepo = provideProductRepository
    }

    async create(product: Product): Promise<ProductServiceResponse> {
      try {
        const productValited = this.validateProduct(product)
        if (productValited.errorMessage !== undefined) {
          return {errorMessage: productValited.errorMessage}
        }

        if (!productValited.isValid) {
          return {created: false, isValid: productValited.isValid, message: productValited.message}
        }
  
        await this.productRepo.save(product)

        return {created: true, isValid: productValited.isValid}
      } catch (error) {
        console.log(error)
        if (error instanceof Error) {
          return {errorMessage: error.message}
        }
        throw(error)
      }
    }

    async delete(productId: number): Promise<ProductServiceResponse> {
      try {
        if (isNaN(productId)) {
          return {isValid: false}
        }
  
        const repoRes = await this.productRepo.delete(productId)

        if (!repoRes) {
          return {isValid: true, wasFound: false}
        }

        return {isValid: true, wasFound: true}
      } catch (error) {
        console.log(error)
        if (error instanceof Error) {
          return {errorMessage: error.message}
        }
        throw(error)
      }
    }

    async listByCategory(categoryId: number): Promise<ProductServiceResponse> {
      try {
        if (isNaN(categoryId)) {
          return {isValid: false}
        }
  
        const products = await this.productRepo.listByCategory(categoryId)

        return {isValid: true, products: products}
      } catch (error) {
        console.log(error)
        if (error instanceof Error) {
          return {errorMessage: error.message}
        }
        throw(error)
      }
    }

    private validateProduct(product: Product): validation {
      try {
        if (!isInt(product.categoryId) || product.name == null) {
          return {
            isValid: false,
            message: "invalid categoryId"
          }
        }
        if (!isString(product.name) || product.name == null) {
          return {
            isValid: false,
            message: "invalid name"
          }
        }        
        if (product.description !== undefined) {
          if (!isString(product.description)) {
            return {
              isValid: false,
              message: "invalid description"
            }
          }
        }

        if (!isFinite(product.price) || !isNull(product.price) || product.price < 0) {
          return {
            isValid: false,
            message: "invalid price"
          }
        }
        
        return {isValid: true}
      } catch (error) {
        console.log(error)
        if (error instanceof Error) {
          return {errorMessage: error.message}
        }
        throw(error)
      }
    }
  };

  export const provideProductService = new ProductService(); 
