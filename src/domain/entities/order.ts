import { Entity, Column, PrimaryGeneratedColumn, } from "typeorm"

export enum OrderStatus {
  Received = 'recebido',
  Preparing = 'em preparação',
  Ready = 'pronto',
  Finished = 'finalizado',
  Unknown = ''
}

export type OrderItem = {
  productId: number
  quantity: number
  productName: string
  price: number
  notes?: string
}

export type OrderUpdateInfo = {
  status: OrderStatus
  updatedAt: Date
}

export type OrderRequest = {
  customerId: number
  command: number
  orderStatus: string
  totalPrice: number
  items: OrderItem[]
}

// export type Order = {
//   id?: number;
//   customerId: number;
//   command: number;
//   orderStatus: OrderStatus;
//   totalPrice: number;
//   items: OrderItem[];
//   orderUpdatedAt: OrderUpdateInfo[];
//   createdAt: Date;
// }

@Entity()
export class OrderDB {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  customerId?: number;

  @Column()
  command: number;

  @Column({ type: 'enum', enum: OrderStatus })
  orderStatus: OrderStatus;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column("jsonb", {array: true})
  items: OrderItem[];

  @Column("jsonb", {array: true})
  orderUpdatedAt: OrderUpdateInfo[];

  @Column()
  createdAt: Date;
}
