import { Product } from '@/domain/entities/product';
import { ProductRepositoryPort } from '@/ports/postgres/product';
import { Pool, QueryResult } from 'pg';
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

    async delete(productId: number): Promise<boolean> {
        try {
            const client = await this.pool.connect();
            const query = `
            DELETE FROM products
            WHERE id=$1;
            `;
            const values = [
                productId
            ];
            
            const result = await client.query(query, values);
            client.release();

            if (result.rowCount === 0) {
                return false
            }

            return true;
        } catch (error) {
            if (error instanceof Error){
                throw new Error(`Error deleting product: ${error.message}`);
            }
            throw new Error(`Error deleting product: ${error}`);
        }
    }

    async listByCategory(categoryId: number): Promise<Product[]> {
        try {
            const client = await this.pool.connect();
            const query = `
            SELECT 
            * 
            FROM products 
            WHERE category_id = $1
            `;
            const values = [
                categoryId
            ];
            
            const result = await client.query(query, values);
            client.release();

            var products: Product[] = []
            result.rows.forEach(product => {
              products.push({
                id: Number(product.id),
                categoryId: product.category_id,
                name: product.name,
                description: product.description,
                price: Number(product.price),
                image: product.image,
                createdAt: product.created_at,
                updatedAt: product.updated_at
              })
            });

            return products;
        } catch (error) {
            if (error instanceof Error){
                throw new Error(`Error listing product: ${error.message}`);
            }
            throw new Error(`Error listing product: ${error}`);
        }
    }
}

export const provideProductRepository = new ProductRepository();
