import { Product, ProductServiceResponse } from '@/domain/entities/product';

export interface ProductServicePort {
  create(product: Product): Promise<ProductServiceResponse>;
  delete(productId: number): Promise<ProductServiceResponse>;
  edit(productId: number, product: Partial<Product>): Promise<{ message: string; status: number }>;
  listByCategory(categoryId: number): Promise<ProductServiceResponse>;
}
