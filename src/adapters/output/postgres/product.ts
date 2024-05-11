import { Product } from '@/domain/entities/product';
import { ProductRepositoryPort } from '@/ports/postgres/product';
import { Pool } from 'pg';

export class ProductRepository implements ProductRepositoryPort {
    private pool: Pool;

    constructor() {
        // Initialize PostgreSQL connection pool
        this.pool = new Pool({
            user: 'your_username',
            host: 'your_host',
            database: 'your_database',
            password: 'your_password',
            port: 5432 // Default PostgreSQL port
        });
    }

    async save(product: Product): Promise<number> {
        // const client = await this.pool.connect();
        // try {
        //     // Begin transaction
        //     await client.query('BEGIN');

        //     // Save order details to "orders" table
        //     const result = await client.query(
        //         `INSERT INTO orders (orderId, customerName, total, orderDate) VALUES ($1, $2, $3, $4) RETURNING id`,
        //         [order.orderId, order.customerName, order.total, order.orderDate]
        //     );

        //     const orderId = result.rows[0].id;

        //     // Save order items to "order_items" table
        //     for (const item of order.items) {
        //         await client.query(
        //             `INSERT INTO order_items (orderId, productName, quantity, price) VALUES ($1, $2, $3, $4)`,
        //             [orderId, item.productName, item.quantity, item.price]
        //         );
        //     }

        //     // Commit transaction
        //     await client.query('COMMIT');

            return 2; // Return the ID of the inserted order
        // } catch (error) {
        //     // Rollback transaction in case of error
        //     await client.query('ROLLBACK');
        //     throw error;
        // } finally {
        //     // Release client back to the pool
        //     client.release();
        // }
    }
}

export const provideProductRepository = new ProductRepository(); // Assuming productRepositoryInstance is an instance of ProductRepository
