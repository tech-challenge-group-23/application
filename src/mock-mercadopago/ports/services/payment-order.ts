import { PaymentOrder } from "@/mock-mercadopago/domain/entities/payment-order"

export interface PaymentOrderServicePort {
  generate(totalPrice: number): Promise<{ qrData: string; payment_id: string }>
  verify(paymentId: string): Promise<PaymentOrder>
  confirmPayment(paymentId: string): Promise<void>
}
