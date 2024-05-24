import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({name: "customers"})
export class Customer {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @Column({
    length: 11,
    unique: true
  })
  cpf!: string;

  @Column('text')
  email!: string;

  @CreateDateColumn()
  created_at?: Date;
}
