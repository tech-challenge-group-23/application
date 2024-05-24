import { Order, OrderRequest } from "@/domain/entities/order";


export interface OrderServicePort {
    create(request: OrderRequest): Promise<Order>
    getById(orderId:number): Promise<Order | null>
    findByFilters(orderStatus?: string, customerId?: number): Promise<Order[] | null>
}
