import { Product } from '../../domain/entities/product';
import { DefaultHttpResponse } from '../utils/response';

export interface ProductRepositoryPort {
  save(product: Product): Promise<number | undefined>;
  delete(productId: number): Promise<boolean>;
  edit(product: Product): Promise<void>;
  listByCategory(categoryId: number): Promise<Product[]>;
  existsProduct(name: string): Promise<boolean>
  getById(id: number): Promise<Product | null>
}
