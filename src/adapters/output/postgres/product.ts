import { Product } from '@/domain/entities/product';
import { ProductRepositoryPort } from '@/ports/postgres/product';
import { AppDataSource } from '@/adapters/output/index';

export class ProductRepository implements ProductRepositoryPort {
    async save(product: Product): Promise<number | undefined> {
        try {
            const insertProduct = await AppDataSource
            .createQueryBuilder()
            .insert()
            .into(Product)
            .values([
                {
                    categoryId: product.categoryId,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    image: product.image,
                }
            ])
            .returning(["id"])
            .execute()




            // console.log("here", product)

            // console.log("test", {
            //     ...product,
            //     categoryId: Number(product.categoryId),
            //     price: Number(product.price),
            // })

            // const newProduct = insertProduct.create({
            //     ...product,
            //     categoryId: Number(product.categoryId),
            //     price: Number(product.price),
            // })

            // console.log("here3")


            // const response = await insertProduct.save(newProduct)


            // console.log("here2")



            // console.log(response)
            // .createQueryBuilder()
            // .insert()
            // .into(Product)
            // .values([
            //     {
            //         categoryId: product.categoryId,
            //         name: product.name,
            //         description: product.description,
            //         price: product.price,
            //         image: product.image,
            //     }
            // ]).execute()

            console.log(insertProduct)



            return insertProduct.raw[0].id
        } catch (error) {
            if (error instanceof Error){
                throw new Error(`Error saving product: ${error.message}`);
            }
            throw new Error(`Error saving product: ${error}`);
        }
    }

    async delete(productId: number): Promise<boolean> {
        try {
            // const client = await this.pool.connect();
            // const query = `
            // DELETE FROM products
            // WHERE id=$1;
            // `;
            // const values = [
            //     productId
            // ];

            // const result = await client.query(query, values);
            // client.release();

            // if (result.rowCount === 0) {
            //     return false
            // }

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
            // const client = await this.pool.connect();
            // const query = `
            // SELECT
            // *
            // FROM products
            // WHERE category_id = $1
            // `;
            // const values = [
            //     categoryId
            // ];

            // const result = await client.query(query, values);
            // client.release();

            var products: Product[] = []
            // result.rows.forEach(product => {
            //   products.push({
            //     id: Number(product.id),
            //     categoryId: product.category_id,
            //     name: product.name,
            //     description: product.description,
            //     price: Number(product.price),
            //     image: product.image,
            //     createdAt: product.created_at,
            //     updatedAt: product.updated_at
            //   })
            // });

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
