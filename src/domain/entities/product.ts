import { TableName } from '@/ports/utils/enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: TableName.PRODUCT })
export class Product {
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

export type ProductServiceResponse = {
  created?: boolean;
  isValid?: boolean;
  wasFound?: boolean;
  products?: Product[];
  message?: string;
  errorMessage?: string;
};
