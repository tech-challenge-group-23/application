import { ProductRepositoryPort } from "@/ports/postgres/product";
import { Product } from "../entities/product";
import { ProductServicePort } from "@/ports/services/product";
import { provideProductRepository } from "@/adapters/output/postgres/product";

  export class ProductService implements ProductServicePort {
    constructor(private readonly pr: ProductRepositoryPort) {
      this.pr = pr
    }
    async create(product: Product): Promise<void> {

      //validate Product

      
      const aaa = await this.pr.save(product)

        
    }
  };

  export const provideProductService = new ProductService(provideProductRepository); 
