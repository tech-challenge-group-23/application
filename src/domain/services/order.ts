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
    !result && console.info(`Order id: ${orderId} not found in database`)
      return result
  }

  private generateNewOrder(orderRequest: OrderRequest): Order {
    return {
      customerId: orderRequest.customer_id,
      command: orderRequest.command,
      orderStatus: this.getOrderStatus(orderRequest.order_status),
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
      orderUpdatedAt: this.appendOrderUpdateAt(this.getOrderStatus(orderRequest.order_status)),
      createdAt: new Date()
    }
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
        return OrderStatus.Unknown;
    }
  }

  private appendOrderUpdateAt(status: OrderStatus, orderUpdatedAt?: OrderUpdateInfo[]) {
    const updateInfo = {status: status, updatedAt: new Date()}
    if(!orderUpdatedAt) {
      orderUpdatedAt = [];
    }

    orderUpdatedAt.push(updateInfo);
    return orderUpdatedAt;
  }
}

export const provideOrderService = new OrderService()
