import { OrderRepositoryPort } from "@/ports/postgres/order";
import { AppDataSource } from '..';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem, OrderStatus, OrderUpdateInfo, Order } from "@/domain/entities/order";

export class OrderRepository implements OrderRepositoryPort {
  private repository = AppDataSource.getRepository(OrderTable);

  async save(order: Order): Promise<Order> {
    try{
      const insertOrder = await AppDataSource
      .createQueryBuilder()
      .insert()
      .into(OrderTable)
      .values([
        { customerId: order.customerId,
          command: order.command,
          orderStatus: order.orderStatus,
          totalPrice: order.totalPrice,
          items: order.items,
          orderUpdatedAt: order.orderUpdatedAt,
          createdAt: order.createdAt}
      ])
      .returning(['id', 'customerId', 'command', 'orderStatus', 'totalPrice', 'items', 'orderUpdatedAt', 'createdAt' ])
      .execute()

      const orderRes = new Order(
        insertOrder.raw[0].command,
        insertOrder.raw[0].orderStatus,
        insertOrder.raw[0].totalPrice,
        insertOrder.raw[0].items,
        insertOrder.raw[0].orderUpdatedAt,
        insertOrder.raw[0].createdAt,
        insertOrder.raw[0].customerId,
        insertOrder.raw[0].id,
      )

      return orderRes

    } catch(error) {
      if(error instanceof Error)
        throw new Error(`Cannot insert the order. Details: ${error.message}`)
    throw new Error(`Cannot insert the order. Details: ${error}`)
    }
  }

  async retrieveById(id: number): Promise<Order | null> {
    const order = await this.repository
    .findOne({where: { id }})

    if (!order) {
      return null
    }

    return new Order(
      order.command,
      order.orderStatus,
      order.totalPrice,
      order.items,
      order.orderUpdatedAt,
      order.createdAt,
      order.customerId,
      order.id,
    );
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

  async update(order: Order): Promise<void> {
    try{
      await AppDataSource
      .createQueryBuilder()
      .update(Order)
      .set({
        command: order.command,
        orderStatus: order.orderStatus,
        totalPrice: order.totalPrice,
        items: order.items,
        orderUpdatedAt: order.orderUpdatedAt})
        .where('orders.id = :id', { id: order.id })
        .execute();

    } catch(error) {
      if(error instanceof Error)
        throw new Error(`Cannot update the order. Details: ${error.message}`)
    throw new Error(`Cannot update the order. Details: ${error}`)
    }
  }
}

@Entity({name: "orders"})
class OrderTable {
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

export const provideOrderRepository = new OrderRepository();
