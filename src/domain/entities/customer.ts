import { TableName } from '@/ports/utils/enums';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: TableName.CUSTOMER })
export class Customer {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @Column({
    length: 11,
  })
  cpf!: string;

  @Column('text')
  email!: string;

  @CreateDateColumn()
  created_at?: Date;
}
