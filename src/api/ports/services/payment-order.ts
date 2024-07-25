export interface PaymentOrderServicePort {
  generate(orderId: number, totalPrice: number): string
}
