import { Product } from '@/domain/entities/product';
import { ProductRepositoryPort } from '@/ports/postgres/product';
import { AppDataSource } from '@/adapters/output/index';
import { DefaultResponse } from '@/ports/utils/response';

export class ProductRepository implements ProductRepositoryPort {
  async save(product: Product): Promise<number | undefined> {
    try {
      const insertProduct = await AppDataSource.createQueryBuilder()
        .insert()
        .into(Product)
        .values([
          {
            categoryId: product.categoryId,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
          },
        ])
        .returning(['id'])
        .execute();

      return insertProduct.raw[0].id;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error saving product: ${error.message}`);
      }
      throw new Error(`Error saving product: ${error}`);
    }
  }

  async delete(productId: number): Promise<boolean> {
    try {
      const deleteProduct = await AppDataSource.createQueryBuilder()
        .delete()
        .from(Product)
        .where('id = :id', { id: productId })
        .execute();

      if (deleteProduct.affected === 0) {
        return false;
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting product: ${error.message}`);
      }
      throw new Error(`Error deleting product: ${error}`);
    }
  }

  async edit(productId: number, product: Partial<Product>): Promise<DefaultResponse> {
    try {
      const productRepository = AppDataSource.getRepository(Product);
      const response = await productRepository.update({ id: productId }, product);

      if (response.affected) {
        return {
          message: `Product ${productId} has been updated successfully`,
          status: 200,
        };
      }

      return {
        message: `Product ${productId} was not updated`,
        status: 404,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error when trying to update product: ${error.message}`);
      }
      throw new Error(`Error updating product: ${error}`);
    }
  }

  async listByCategory(categoryId: number): Promise<Product[]> {
    try {
      const listProductByCategory = await AppDataSource.createQueryBuilder()
        .select('products')
        .from(Product, 'products')
        .where('products.categoryId = :categoryId', { categoryId: categoryId })
        .getMany();

      return listProductByCategory;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error listing product: ${error.message}`);
      }
      throw new Error(`Error listing product: ${error}`);
    }
  }
}

export const provideProductRepository = new ProductRepository();
