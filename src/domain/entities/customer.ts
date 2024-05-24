import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({name: "customers"})
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

  // constructor(name: string, cpf: string, email: string) {
  //     this.name = name;
  //     this.cpf = cpf;
  //     this.email = email;
  // }
}
