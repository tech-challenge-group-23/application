import { OrderRepositoryPort } from "@/ports/postgres/order";
import { OrderServicePort } from "@/ports/services/order";
import { Order, OrderItem, OrderItemRequest, OrderRequest, OrderStatus, OrderUpdateInfo} from "../entities/order";
import { provideOrderRepository } from "@/adapters/output/postgres/order";

export class OrderService implements OrderServicePort {
  private orderRepository: OrderRepositoryPort

  constructor() {
      this.orderRepository = provideOrderRepository
  }

  async create(request: OrderRequest): Promise<Order> {

    const newOrder = this.generateNewOrder(request);
      try{
          const result = await this.orderRepository.save(newOrder);


          return result;

      } catch(error) {
          if(error instanceof Error)
              throw new Error(`An error occurred when creating a new order. Details: ${error.message}`)
          throw new Error(`An error occurred when creating a new order. : ${error}`)
      }
  }

  async getById(orderId:number): Promise<Order | null> {
    const result = await this.orderRepository.retrieveById(orderId);
    !result && console.info(`[INFO] Order id ${orderId} was not found in the database`)
      return result
  }

  async findByFilters(orderStatus?: string, customerId?: number): Promise<Order[] | null> {
    try{
      let statusEnum: OrderStatus | undefined;

      if(orderStatus) {
        statusEnum = this.getOrderStatus(orderStatus);

        if(!statusEnum){
          throw new Error(`Invalid order status: ${orderStatus}`);
        }
      }

    return await this.orderRepository.retrieveByFilters(statusEnum, customerId);

    }catch(error) {
      throw new Error(`Error in find orders by filters: ${error}`);
    }
  }

  private generateNewOrder(orderRequest: OrderRequest): Order {
    const orderStatusEnum = this.getOrderStatus(orderRequest.order_status);
    if(!orderStatusEnum){
      throw new Error(`Invalid order status: ${orderRequest.order_status}`);
    }

    const order: Order = {
      customerId: orderRequest.customer_id,
      command: orderRequest.command,
      orderStatus: orderStatusEnum,
      totalPrice: orderRequest.total_price,
      items: orderRequest.items.map((item: OrderItemRequest): OrderItem => {
        const newItem: OrderItem = {
            productId: item.product_id,
            quantity: item.quantity,
            productName: item.product_name,
            price: item.price,
        };
        if (item.notes) {
            newItem.notes = item.notes;
        }
        return newItem;
    }),
      orderUpdatedAt: this.appendOrderUpdateAt(orderStatusEnum),
      createdAt: new Date()
    }

    return order
  }

  private getOrderStatus(status: string): OrderStatus | undefined {
    switch (status) {
      case 'recebido':
        return OrderStatus.Received;
      case 'em preparação':
        return OrderStatus.Preparing;
      case 'pronto':
        return OrderStatus.Ready;
      case 'finalizado':
        return OrderStatus.Finished;
    }
  }

  private appendOrderUpdateAt(status: OrderStatus, orderUpdatedAt?: OrderUpdateInfo[]): OrderUpdateInfo[] {
    const updateInfo = {status: status, updatedAt: new Date()}
    if(!orderUpdatedAt) {
      orderUpdatedAt = [];
    }

    orderUpdatedAt.push(updateInfo);
    return orderUpdatedAt;
  }
}

export const provideOrderService = new OrderService()
