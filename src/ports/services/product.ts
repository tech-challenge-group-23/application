import { Product, ProductServiceResponse } from '@/domain/entities/product';
import { DefaultHttpResponse } from '../utils/response';

export interface ProductServicePort {
  create(product: Product): Promise<ProductServiceResponse>;
  delete(productId: number): Promise<DefaultHttpResponse>;
  edit(productId: number, product: Partial<Product>): Promise<DefaultHttpResponse>;
  listByCategory(categoryId: number): Promise<{ products: Product[] }>;
}
