import { NewOrderRequest, OrderStatus } from '@/domain/entities/order';

export function validateOrderRequest(request: NewOrderRequest, isCustomer: boolean): string[] {
  const errors: string[] = [];

  if (request.customer_id == null) {
    errors.push('customerId is mandatory');
  }

  if (request.customer_id != null && !isCustomer) {
    errors.push('customerId not found');
  }

  if (request.command == null) {
    errors.push('command is mandatory');
  }

  const invalidOrderStatusError = validateOrderStatus(request.order_status);
  if (invalidOrderStatusError.length > 0) {
    errors.concat(invalidOrderStatusError);
  }

  if (request.total_price == null) {
    errors.push('totalPrice is mandatory');
  }

  if (!request.items || request.items.length === 0) {
    errors.push('items is mandatory');
  }

  return errors;
}

export function validateOrderStatus(status?: string): string[] {
  const errors: string[] = [];

  if (status == null) {
    errors.push('orderStatus is mandatory');
  }

  if (status != null && !isOrderStatus(status)) {
    errors.push('invalid value for order_status');
  }
  return errors;
}

function isOrderStatus(status: string): boolean {
  return Object.values(OrderStatus).includes(status as OrderStatus);
}
