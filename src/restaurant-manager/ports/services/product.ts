import { Product, ProductServiceResponse } from '@/domain/entities/product';
import { DefaultHttpResponse } from '../utils/response';

export interface ProductServicePort {
  create(product: Product): Promise<ProductServiceResponse>;
  delete(productId: number): Promise<ProductServiceResponse>;
  edit(product: Product): Promise<ProductServiceResponse>
  listByCategory(categoryId: number): Promise<ProductServiceResponse>;
}
