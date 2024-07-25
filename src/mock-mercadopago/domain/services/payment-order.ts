import { providePaymentOrderRepository } from "@/mock-mercadopago/adapters/output/payment"
import { PaymentOrderRepositoryPort } from "@/mock-mercadopago/ports/repository/payment"
import { PaymentOrderServicePort } from "@/mock-mercadopago/ports/services/payment-order"
import { PaymentOrder } from "../entities/payment-order"

export class PaymentOrderService implements PaymentOrderServicePort {
  private paymentOrderRepository: PaymentOrderRepositoryPort

  constructor() {
    this.paymentOrderRepository = providePaymentOrderRepository
  }
  async generate(orderId: number, totalPrice: number): Promise<string> {
    const qrData = "00020101021243650016COM.MERCADOLIBRE02013063638f1192a-5fd1-4180-a180-8bcae3556bc35204000053039865802BR5925IZABEL AAAA DE MELO6007BARUERI62070503***63040B6D"


    const paymentOrder = new PaymentOrder(orderId, qrData, true)

    await this.paymentOrderRepository.create(paymentOrder)

    return qrData;

  }
  async verify(orderId: number) {
    const response = await this.paymentOrderRepository.getById(orderId)

    return response
  }
}

export const providePaymentOrderService = new PaymentOrderService();
