import { Order, OrderStatus } from '@/domain/entities/order'
import { OrderRepositoryPort } from "@/ports/postgres/order";
import { AppDataSource } from '..';

export class OrderRepository implements OrderRepositoryPort {
  private repository = AppDataSource.getRepository(Order);

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

  async retrieveById(id: number): Promise<Order | null> {
    const order = await this.repository
    .findOne({where: { id }})
    return order;
  }
  async retrieveByFilters(orderStatus?: OrderStatus, customerId?: number): Promise<Order[] | null> {

    if (orderStatus && customerId) {
      return await AppDataSource.createQueryBuilder()
        .select('orders')
        .from(Order, 'orders')
        .where('orders.orderStatus = :orderStatus', { orderStatus: orderStatus })
        .andWhere('orders.customerId = :customerId', { customerId: customerId })
        .getMany();
    }

    if(orderStatus){
      return await AppDataSource.createQueryBuilder()
      .select('orders')
        .from(Order, 'orders')
        .where('orders.orderStatus = :orderStatus', { orderStatus: orderStatus })
        .getMany();
    }

    if(customerId){
      return await AppDataSource.createQueryBuilder()
        .select('orders')
        .from(Order, 'orders')
        .where('orders.customerId = :customerId', { customerId: customerId })
        .getMany();
    }
    return null
  }
}

  export const provideOrderRepository = new OrderRepository();
