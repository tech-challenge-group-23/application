import { NewOrderRequest, Order, OrderServiceResponse, UpdateOrderRequest } from "@/domain/entities/order"


export interface OrderServicePort {
    create(request: NewOrderRequest): Promise<OrderServiceResponse>
    getById(orderId:number): Promise<Order | null>
    findByFilters(orderStatus?: string, customerId?: number): Promise<OrderServiceResponse>
    updateStatus(request: UpdateOrderRequest): Promise<void>
}
