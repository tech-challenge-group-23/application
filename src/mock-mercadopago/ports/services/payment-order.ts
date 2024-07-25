import { PaymentOrder } from "@/mock-mercadopago/domain/entities/payment-order"

export interface PaymentOrderServicePort {
  generate(orderId: number, totalPrice: number): Promise<string>
  verify(orderId: number): Promise<PaymentOrder>
}
