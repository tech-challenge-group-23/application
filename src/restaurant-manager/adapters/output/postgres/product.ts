import { Product } from '@/domain/entities/product';
import { ProductRepositoryPort } from '@/ports/postgres/product';
import { AppDataSource } from '@/adapters/output/index';
import { TableName } from '@/ports/utils/enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class ProductRepository implements ProductRepositoryPort {
  async save(product: Product): Promise<number | undefined> {
    try {
      const insertProduct = await AppDataSource.createQueryBuilder()
        .insert()
        .into(ProductRepo)
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
        .from(ProductRepo)
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

  async edit(product: Product): Promise<void> {
    try {
      const productRepository = AppDataSource.getRepository(ProductRepo);
      await productRepository.update({ id: product.id }, product);
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

  async existsProduct(name: string): Promise<boolean> {
    try {
      const product = await AppDataSource.createQueryBuilder()
        .select('products')
        .from(ProductRepo, 'products')
        .where('products.name = :name', { name: name })
        .getOne();

      if (product === null) {
        return false;
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error checking existence product: ${error.message}`);
      }
      throw new Error(`Error checking existence product: ${error}`);
    }
  }

  async getById(id: number): Promise<Product | null> {
    try {
      const productRepository = AppDataSource.getRepository(Product);

      const product = await productRepository.findOneBy({ id });

      !product && console.info(`[INFO] Product id ${id} was not found in the database`);

      return product;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting product by id: ${error.message}`);
      }
      throw new Error(`Error getting product by id: ${error}`);
    }
  }
}

@Entity({ name: TableName.PRODUCT })
export class ProductRepo {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  categoryId!: number;

  @Column({
    unique: true,
  })
  name!: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  description?: string;

  @Column('numeric', {
    scale: 2,
    transformer: {
      from: (value) => (value === null ? null : Number(value)),
      to: (value) => value,
    },
  })
  price!: number;

  @Column('bytea', { nullable: true })
  image?: Buffer;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}

export const provideProductRepository = new ProductRepository();
