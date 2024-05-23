import { Order } from '../../domain/entities/order';

export interface OrderRepositoryPort {
  save(order: Order): Promise<Order>
  retrieveById(orderId:number): Promise<Order>
  //retrieveByStatus(orderId:number): Promise<Order[]>
  // update(order: Order): Promise<number>
}
