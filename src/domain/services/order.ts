import { OrderRepositoryPort } from "@/ports/postgres/order";
import { OrderServicePort } from "@/ports/services/order";
import { Order, OrderItem, OrderItemRequest, NewOrderRequest, OrderStatus, OrderUpdateInfo, UpdateOrderRequest} from "../entities/order";
import { provideOrderRepository } from "@/adapters/output/postgres/order";

export class OrderService implements OrderServicePort {
  private orderRepository: OrderRepositoryPort

  constructor() {
      this.orderRepository = provideOrderRepository
  }

  async create(request: NewOrderRequest): Promise<Order> {

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
    const statusEnum = orderStatus ? this.getOrderStatus(orderStatus) : undefined;
    return await this.orderRepository.retrieveByFilters(statusEnum, customerId);

    }catch(error) {
      throw new Error(`Error in find orders by filters: ${error}`);
    }
  }

  async updateStatus(request: UpdateOrderRequest): Promise<void> {
    try{
      const statusEnum = this.getOrderStatus(request.order_status);
      const order = await this.getById(request.order_id);

      if(order){
        order.orderStatus = statusEnum;
        order.orderUpdatedAt = this.appendOrderUpdateAt(statusEnum, order.orderUpdatedAt)
        await this.orderRepository.update(order);
      }

    }catch(error) {
      throw new Error(`Error in update order's status: ${error}`);
    }
  }

  private generateNewOrder(orderRequest: NewOrderRequest): Order {
    const orderStatusEnum = this.getOrderStatus(orderRequest.order_status);

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

  private getOrderStatus(status: string): OrderStatus {
    switch (status) {
      case 'recebido':
        return OrderStatus.Received;
      case 'em preparação':
        return OrderStatus.Preparing;
      case 'pronto':
        return OrderStatus.Ready;
      case 'finalizado':
        return OrderStatus.Finished;
      default:
        throw new Error(`Invalid order status: ${status}`);
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
