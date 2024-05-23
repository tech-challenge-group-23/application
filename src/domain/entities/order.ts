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

export type OrderItemRequest = {
  product_id: number
  quantity: number
  product_name: string
  price: number
  notes?: string
}

export type OrderUpdateInfo = {
  status: OrderStatus
  updatedAt: Date
}

export type OrderRequest = {
  customer_id: number
  command: number
  order_status: string
  total_price: number
  items: OrderItemRequest[]
}

@Entity()
export class Order {
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

  @Column("jsonb")
  items: OrderItem[];

  @Column("jsonb")
  orderUpdatedAt: OrderUpdateInfo[];

  @Column()
  createdAt: Date;
}
