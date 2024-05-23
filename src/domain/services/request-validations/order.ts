import { OrderRequest, OrderStatus } from "@/domain/entities/order"

export function validateOrderRequest(request: OrderRequest): string[] {
  const errors: string[] = [];

  if(!isOrderStatus(request.order_status)){
    errors.push ('invalid value for order_status');
  }

  if (request.customer_id == null) {
    errors.push('customerId is mandatory')
  }

  if (request.command == null) {
    errors.push('command is mandatory')
  }

  if (request.order_status == null) {
    errors.push('orderStatus is mandatory')
  }

  if (request.total_price == null) {
    errors.push('totalPrice is mandatory')
  }

  if (!request.items || request.items.length === 0) {
    errors.push('items is mandatory')
  }

  return errors
}

function isOrderStatus(status: string): status is OrderStatus {
  return Object.values(OrderStatus).includes(status as OrderStatus);
}
