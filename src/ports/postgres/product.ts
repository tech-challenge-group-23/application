import { Product } from '../../domain/entities/product';
 
export interface ProductRepositoryPort {
      save(product: Product): Promise<number>
  }

  