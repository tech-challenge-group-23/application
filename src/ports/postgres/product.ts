import { Product } from '../../domain/entities/product';
import { DefaultResponse } from '../utils/response';

export interface ProductRepositoryPort {
  save(product: Product): Promise<number | undefined>;
  delete(productId: number): Promise<boolean>;
  edit(productId: number, product: Partial<Product>): Promise<DefaultResponse>;
  listByCategory(categoryId: number): Promise<Product[]>;
}
