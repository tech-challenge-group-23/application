import { PaymentOrder } from "@/mock-mercadopago/domain/entities/payment-order"

export interface PaymentOrderRepositoryPort {
  create({ id, qrData, paymentStatus }: PaymentOrder): Promise<boolean>
  getById(id: number): Promise<PaymentOrder>
}
