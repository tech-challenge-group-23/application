import { PaymentOrderRepositoryPort } from "@/mock-mercadopago/ports/repository/payment";
import database from "./db";
import { PaymentOrder } from "@/mock-mercadopago/domain/entities/payment-order";


class PaymentOrderRepository implements PaymentOrderRepositoryPort{
  confirm(paymentId: string): Promise<void> {
    database.forEach((paymentOrder) => {
      if (paymentOrder.id === paymentId) {
        paymentOrder.paymentStatus = true
      }
    })

    return new Promise((resolve) => resolve())
  }
  getById(paymentId: string): Promise<PaymentOrder> {
    const paymentOrder = database.filter((paymentOrder) => paymentOrder.id === paymentId)

    return new Promise((resolve) => setTimeout(() => resolve(paymentOrder as unknown as PaymentOrder), 1000));
  }
  create({ id, qrData, paymentStatus }: PaymentOrder): Promise<boolean> {
    database.push({ id, qrData, paymentStatus })

    return new Promise((resolve) => resolve(true))
  }
}

export const providePaymentOrderRepository = new PaymentOrderRepository()
