import { Product } from '@/domain/entities/product';
import { ProductRepositoryPort } from '@/ports/postgres/product';
import { Pool } from 'pg';

export class ProductRepository implements ProductRepositoryPort {
    private pool: Pool;

    constructor() {
        // Initialize PostgreSQL connection pool
        this.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: 'admin123',
            port: 5432 // Default PostgreSQL port
        });
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
            client.release(); // Release the client back to the pool
            console.log("hmmmmmmmmmmmmmmm quereeeeeee")
            return result.rows[0].id;
        } catch (error: any) {
            throw new Error(`Error saving product: ${error.message}`);
        }
    }
}

export const provideProductRepository = new ProductRepository(); // Assuming productRepositoryInstance is an instance of ProductRepository
