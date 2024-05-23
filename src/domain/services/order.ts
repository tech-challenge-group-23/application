import { OrderRepositoryPort } from "@/ports/postgres/order";
import { OrderServicePort } from "@/ports/services/order";
import { OrderDB, OrderRequest, OrderStatus, OrderUpdateInfo} from "../entities/order";
import { provideOrderRepository } from "@/adapters/output/postgres/order";

export class OrderService implements OrderServicePort {
  private orderRepository: OrderRepositoryPort

  constructor() {
      this.orderRepository = provideOrderRepository
  }

  async create(request: OrderRequest): Promise<number> {

    const newOrder = this.generateNewOrder(request);

      try{
          const result = await this.orderRepository.save(newOrder)

          return result;

      } catch(error) {
          if(error instanceof Error)
              throw new Error(`Erro ao incluir cliente: ${error.message}`)
          throw new Error(`Erro ao incluir cliente: ${error}`)
      }
  }

  async getById(orderId:number): Promise<OrderDB> {
    try{
      const result = await this.orderRepository.retrieveById(orderId);
      return result

    } catch(error) {
        if(error instanceof Error)
          throw new Error(`Error when searching for cpf: ${error.message}`)

      throw new Error(`Error when searching for cpf: ${error}`)
    }
  }

  private generateNewOrder(orderRequest: OrderRequest): OrderDB {
    return {
      customerId: orderRequest.customerId,
      command: orderRequest.command,
      orderStatus: this.getOrderStatus(orderRequest.orderStatus),
      totalPrice: orderRequest.totalPrice,
      items: orderRequest.items,
      orderUpdatedAt: this.assocOrderUpdateAt(OrderStatus.Received),
      createdAt: new Date()
    }
  }

  private getOrderStatus(status: string): OrderStatus {
    switch (status) {
      case OrderStatus.Received:
        return OrderStatus.Received;
      case OrderStatus.Preparing:
        return OrderStatus.Preparing;
      case OrderStatus.Ready:
        return OrderStatus.Ready;
      case OrderStatus.Finished:
        return OrderStatus.Finished;
      default:
        return OrderStatus.Unknown;
    }
  }

  private assocOrderUpdateAt(status: OrderStatus, orderUpdatedAt?: OrderUpdateInfo[]) {
    const updateInfo = {status: status, updatedAt: new Date()}
    if(!orderUpdatedAt) {
      orderUpdatedAt = [];
    }

    orderUpdatedAt.push(updateInfo);
    return orderUpdatedAt;
  }

}
