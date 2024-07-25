import { PaymentOrder } from "../repository/payment"

export interface PaymentOrderServicePort {
  generate(orderId: number, totalPrice: number): Promise<string>
  verify(orderId: number): Promise<PaymentOrder>
}
