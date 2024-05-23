import { Product } from '../../domain/entities/product';

export interface ProductRepositoryPort {
      save(product: Product): Promise<number | undefined>
      delete(productId: number): Promise<boolean>
      listByCategory(categoryId: number): Promise<Product[]>
  }
