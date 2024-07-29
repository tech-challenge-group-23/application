import { NewOrderRequest, OrderServiceResponse, Order, UpdateOrderRequest } from "@/restaurant-manager/domain/entities/order"

export interface OrderServicePort {
    create(request: NewOrderRequest): Promise<OrderServiceResponse>
    getById(orderId:number): Promise<Order | null>
    findByFilters(orderStatus?: string, customerId?: number): Promise<OrderServiceResponse>
    updateStatus(request: UpdateOrderRequest): Promise<void>
    findOrdersIDOpenPayments(): Promise<number[]>
    findAllOrders(): Promise<Order[]>
    updatePaymentStatus(paymentId: string): Promise<void>
}
