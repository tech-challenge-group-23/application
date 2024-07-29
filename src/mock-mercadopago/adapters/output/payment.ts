import { PaymentOrderRepositoryPort } from "@/mock-mercadopago/ports/repository/payment";
import database from "./db";
import { PaymentOrder } from "@/mock-mercadopago/domain/entities/payment-order";


class PaymentOrderRepository implements PaymentOrderRepositoryPort{
  confirm(orderId: number): Promise<void> {
    database.forEach((paymentOrder) => {
      if (paymentOrder.id === orderId) {
        paymentOrder.paymentStatus = true
      }
    })

    return new Promise((resolve) => resolve())
  }
  getById(id: number): Promise<PaymentOrder> {
    const paymentOrder = database.filter((paymentOrder) => paymentOrder.id === id)

    return new Promise((resolve) => setTimeout(() => resolve(paymentOrder as unknown as PaymentOrder), 1000));
  }
  create({ id, qrData, paymentStatus }: PaymentOrder): Promise<boolean> {
    database.push({ id, qrData, paymentStatus })

    return new Promise((resolve) => resolve(true))
  }
}

export const providePaymentOrderRepository = new PaymentOrderRepository()
