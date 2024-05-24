import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({name: "products"})
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  categoryId!: number;

  @Column({
    unique: true
  })
  name!: string;

  @Column({
    nullable: true,
    type: "text"

   })
  description?: string;

  @Column("numeric", {
    scale: 2
  })
  price!: number;

  @Column('bytea', { nullable: true })
  image?: Buffer;

  @CreateDateColumn()
  createdAt?: Date;

  @CreateDateColumn()
  updatedAt?: Date;
}

export type ProductServiceResponse = {
  created?: boolean;
  isValid?: boolean;
  wasFound?: boolean;
  products?: Product[];
  message?: string;
  errorMessage?: string;
};
