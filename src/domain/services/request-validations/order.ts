import { OrderRequest, OrderStatus } from "@/domain/entities/order"

export function validateOrderRequest(request: OrderRequest, isCustomer: boolean): string[] {
  const errors: string[] = [];

  if (request.customer_id == null) {
    errors.push('customerId is mandatory')
  }

  if (request.customer_id != null && !isCustomer){
    errors.push('customerId not found')
  }

  if (request.command == null) {
    errors.push('command is mandatory')
  }

  if (request.order_status == null) {
    errors.push('orderStatus is mandatory')
  }

  const invalidOrderStatusError = validateOrderStatus(request.order_status);
  invalidOrderStatusError && errors.push(invalidOrderStatusError);

  if (request.total_price == null) {
    errors.push('totalPrice is mandatory')
  }

  if (!request.items || request.items.length === 0) {
    errors.push('items is mandatory')
  }

  return errors
}

export function validateOrderStatus(status?: string): string | undefined {
  if(status != null && !isOrderStatus(status)){
    return 'invalid value for order_status'
  }
}

function isOrderStatus(status: string): boolean {
return Object.values(OrderStatus).includes(status as OrderStatus);
}
