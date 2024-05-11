import { Product } from '@/domain/entities/product';

export interface ProductServicePort {
    create(product: Product): Promise<void>
}