import { PaymentOrder } from "@/mock-mercadopago/domain/entities/payment-order"

export interface PaymentOrderRepositoryPort {
  create({ id, qrData, paymentStatus }: PaymentOrder): Promise<boolean>
  getById(paymentId: string): Promise<PaymentOrder>
  confirm(paymentId: string): Promise<void>
}
