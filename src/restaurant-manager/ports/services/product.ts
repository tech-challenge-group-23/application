import { Product, ProductServiceResponse } from "@/restaurant-manager/domain/entities/product";

export interface ProductServicePort {
  create(product: Product): Promise<ProductServiceResponse>;
  delete(productId: number): Promise<ProductServiceResponse>;
  edit(product: Product): Promise<ProductServiceResponse>
  listByCategory(categoryId: number): Promise<ProductServiceResponse>;
}
