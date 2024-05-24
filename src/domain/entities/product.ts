// import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  categoryId!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  price!: number;

  @Column('bytea', { nullable: true })
  image?: Buffer;

  @Column({ type: 'timestamp', nullable: true })
  createdAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  //   constructor(
  //     categoryId: number,
  //     name: string,
  //     description: string = '',
  //     price: number,
  //     image: Buffer | undefined = undefined,
  //   ) {
  //     this.categoryId = categoryId;
  //     this.name = name;
  //     this.description = description;
  //     this.price = price;
  //     this.image = image;
  //   }
}

export type ProductServiceResponse = {
  created?: boolean;
  isValid?: boolean;
  wasFound?: boolean;
  products?: Product[];
  message?: string;
  errorMessage?: string;
};
