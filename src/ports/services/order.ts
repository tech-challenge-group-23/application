import { OrderDB, OrderRequest } from "@/domain/entities/order";


export interface OrderServicePort {
    create(request: OrderRequest): Promise<number>
    getById(orderId:number): Promise<OrderDB>
    // updateOrderStatus(orderId: number, newStatus: OrderStatus): Promisse<Order>
}
