import { Product } from '@/domain/entities/product';
import { ProductRepositoryPort } from '@/ports/postgres/product';
import { Pool } from 'pg';
import { connection } from './connection';

export class ProductRepository implements ProductRepositoryPort {
    private pool: Pool;

    constructor() {
        // Initialize PostgreSQL connection pool
        this.pool = connection
    }

    async save(product: Product): Promise<number> {
        try {
            const client = await this.pool.connect();
            const query = `
                INSERT INTO products 
                (
                    category_id, 
                    name, 
                    description, 
                    price, 
                    image
                )
                VALUES 
                (
                    $1, 
                    $2, 
                    $3, 
                    $4, 
                    $5
                )
                RETURNING id`;
            const values = [
                product.categoryId,
                product.name,
                product.description,
                product.price,
                product.image
            ];
            
            const result = await client.query(query, values);
            client.release(); 

            return result.rows[0].id;
        } catch (error) {
            if (error instanceof Error){
                throw new Error(`Error saving product: ${error.message}`);
            }
            throw new Error(`Error saving product: ${error}`);
        }
    }
}

export const provideProductRepository = new ProductRepository();
