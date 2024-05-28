import { Product, ProductServiceResponse } from '@/domain/entities/product';
import { DefaultResponse } from '../utils/response';

export interface ProductServicePort {
  create(product: Product): Promise<ProductServiceResponse>;
  delete(productId: number): Promise<DefaultResponse>;
  edit(productId: number, product: Partial<Product>): Promise<DefaultResponse>;
  listByCategory(categoryId: number): Promise<{ products: Product[] }>;
}
