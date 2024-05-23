import { Order } from '@/domain/entities/order'
import { OrderRepositoryPort } from "@/ports/postgres/order";
import { AppDataSource } from '..';

export class OrderRepository implements OrderRepositoryPort {
  async save(order: Order): Promise<Order> {
    try{
      const insertOrder = await AppDataSource
      .createQueryBuilder()
      .insert()
      .into(Order)
      .values([
        { customerId: order.customerId,
          command: order.command,
          orderStatus: order.orderStatus,
          totalPrice: order.totalPrice,
          items: order.items,
          orderUpdatedAt: order.orderUpdatedAt,
          createdAt: order.createdAt}
      ])
      .returning(['id', 'customerId', 'command', 'orderStatus', 'totalPrice', 'items'])
      .execute()

      return insertOrder.raw[0]

    } catch(error) {
      if(error instanceof Error)
        throw new Error(`Cannot insert the order. Details: ${error.message}`)
    throw new Error(`Cannot insert the order. Details: ${error}`)
    }
  }

  async retrieveById(orderId: number): Promise<Order> {
    try{
      const retrieveOrder = await AppDataSource
      .createQueryBuilder()
      .select('order')
      .from(Order, 'order')
      .where('order.id = :id', {id: orderId})
      .getOne()

      if(retrieveOrder?.id) {
        return retrieveOrder
    } else {
        throw new Error(`Order : ${orderId} not registered in the base.`)
    }

    }catch(error) {
      if(error instanceof Error)
          throw new Error(`Cannot find the order. Details: ${error.message}`)
      throw new Error(`Cannot find the order. Details ${error}`)
    }
  }
}

  export const provideOrderRepository = new OrderRepository();
