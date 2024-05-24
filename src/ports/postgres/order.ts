import { Order, OrderStatus } from '../../domain/entities/order';

export interface OrderRepositoryPort {
  save(order: Order): Promise<Order>
  retrieveById(orderId:number): Promise<Order | null>
  retrieveByFilters(orderStatus?: OrderStatus, customerId?: number): Promise<Order[] | null>
}
