import { TableName } from "@/restaurant-manager/ports/utils/enums"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

export enum OrderStatus {
  WaitingPayment = 'pagamento pendente',
  Received = 'recebido',
  Preparing = 'em preparação',
  Ready = 'pronto',
  Finished = 'finalizado'
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

export type NewOrderRequest = {
  customer_id: number
  command: number
  order_status: string
  total_price: number
  items: OrderItemRequest[]
}

export type UpdateOrderRequest = {
  order_id: number
  order_status: string
}

export class Order {
   id?: number;
   customerId?: number;
   command: number;
   orderStatus: OrderStatus;
   totalPrice: number;
   items: OrderItem[];
   orderUpdatedAt: OrderUpdateInfo[];
   createdAt: Date;
   qrCode?: string;

   constructor(
    command: number,
    orderStatus: OrderStatus,
    totalPrice: number,
    items: OrderItem[],
    orderUpdatedAt: OrderUpdateInfo[],
    createdAt: Date,
    customerId?: number,
    id?: number,
    qrCode?: string,
  ) {
    this.id = id;
    this.customerId = customerId;
    this.command = command;
    this.orderStatus = orderStatus;
    this.totalPrice = totalPrice;
    this.items = items;
    this.orderUpdatedAt = orderUpdatedAt;
    this.createdAt = createdAt;
    this.qrCode = qrCode;
  }

  validateOrderRequest(request: NewOrderRequest, isCustomer: boolean): string[] {
    const errors: string[] = [];

    if (request.customer_id == null) {
      errors.push('customerId is mandatory');
    }

    if (request.customer_id != null && !isCustomer) {
      errors.push('customerId not found');
    }

    if (request.command == null) {
      errors.push('command is mandatory');
    }

    const invalidOrderStatusError = validateOrderStatus(request.order_status);
    if (invalidOrderStatusError.length > 0) {
      errors.concat(invalidOrderStatusError);
    }

    if (request.total_price == null) {
      errors.push('totalPrice is mandatory');
    }

    if (!request.items || request.items.length === 0) {
      errors.push('items is mandatory');
    }

    return errors;
  }
}

export function validateOrderStatus(status?: string): string[] {
  const errors: string[] = [];

  if (status == null) {
    errors.push('orderStatus is mandatory');
  }

  if (status != null && !isOrderStatus(status)) {
    errors.push('invalid value for order_status');
  }
  return errors;
}

export function isOrderStatus(status: string): boolean {
  return Object.values(OrderStatus).includes(status as OrderStatus);
}

export type OrderServiceResponse = {
  erros?: string[] | null;
  isValid?: boolean;
  message?: string;
  order?: Order;
  orders?: Order[] | null;
}

@Entity({ name: TableName.ORDER })
export class OrderTable {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  customerId?: number;

  @Column()
  command!: number;

  @Column({ type: 'enum', enum: OrderStatus })
  orderStatus!: OrderStatus;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice!: number;

  @Column("jsonb")
  items!: OrderItem[];

  @Column("jsonb")
  orderUpdatedAt!: OrderUpdateInfo[];

  @Column()
  createdAt!: Date;
}
