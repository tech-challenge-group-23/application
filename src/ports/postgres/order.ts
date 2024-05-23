import { OrderDB, OrderStatus } from '../../domain/entities/order';

export interface OrderRepositoryPort {
  save(order: OrderDB): Promise<number>
  retrieveById(orderId:number): Promise<OrderDB>
  // update(order: Order): Promise<number>
  // updateOrderStatus(orderId: number, newStatus: OrderStatus): Promise<Order>
}
