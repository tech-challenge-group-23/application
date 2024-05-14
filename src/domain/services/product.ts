import { ProductRepositoryPort } from "@/ports/postgres/product";
import { Product, ProductServiceResponse  } from "../entities/product";
import { ProductServicePort } from "@/ports/services/product";
import { provideProductRepository } from "@/adapters/output/postgres/product";
import { isInt, isString, validation } from "aux/helpers/validation";
import { isArrayBuffer } from "util/types";

  export class ProductService implements ProductServicePort {
    private pr: ProductRepositoryPort
    constructor() {
      this.pr = provideProductRepository
    }

    async create(product: Product): Promise<ProductServiceResponse> {
      try {
        const productValited = this.validateProduct(product)
        if (!productValited.isValid) {
          return {created: false, isValid: productValited.isValid, message: productValited.message}
        } 
  
        await this.pr.save(product)
        return {created: true, isValid: productValited.isValid}
      } catch (error) {
        console.log(error)
        return {created: false, isValid: false, message: error}
      }
    }

    private validateProduct(product: Product): validation {
      try {
        if (!isInt(Number(product.categoryId)) || product.name == null) {
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
        if (!isString(product.description) || product.description == null) {
          return {
            isValid: false,
            message: "invalid description"
          }
        }
        if (!isFinite(product.price) || product.price == null || product.price < 0) {
          return {
            isValid: false,
            message: "invalid price"
          }
        }
        
        return {isValid: true}
      } catch (error) {
        return {isValid: false, message: error}
      }
    }
  };


  export const provideProductService = new ProductService(); 
