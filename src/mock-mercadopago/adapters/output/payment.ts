import { PaymentOrderRepositoryPort } from "@/mock-mercadopago/ports/repository/payment";
import database from "./db";
import { PaymentOrder } from "@/mock-mercadopago/domain/entities/payment-order";


class PaymentOrderRepository implements PaymentOrderRepositoryPort{
  getById(id: number): Promise<PaymentOrder> {
    const paymentOrder = database.filter((paymentOrder) => paymentOrder.id === id)

    return new Promise((resolve) => setTimeout(() => resolve(paymentOrder as unknown as PaymentOrder), 1000));
  }
  create({ id, qrData, paymentStatus }: PaymentOrder): Promise<boolean> {
    const paymentOrder = { id, qrData, paymentStatus };

    database.push(paymentOrder)

    return new Promise((resolve) => resolve(true))
  }
}

export const providePaymentOrderRepository = new PaymentOrderRepository()
