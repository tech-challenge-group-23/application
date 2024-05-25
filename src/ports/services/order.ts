import { Order, NewOrderRequest, UpdateOrderRequest } from "@/domain/entities/order";


export interface OrderServicePort {
    create(request: NewOrderRequest): Promise<Order>
    getById(orderId:number): Promise<Order | null>
    findByFilters(orderStatus?: string, customerId?: number): Promise<Order[] | null>
    updateStatus(request: UpdateOrderRequest): Promise<void>
}
