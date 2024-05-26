import { Product } from '../../domain/entities/product';

export interface ProductRepositoryPort {
  save(product: Product): Promise<number | undefined>;
  delete(productId: number): Promise<boolean>;
  edit(productId: number, product: Partial<Product>): Promise<{ message: string; status: number }>;
  listByCategory(categoryId: number): Promise<Product[]>;
}
