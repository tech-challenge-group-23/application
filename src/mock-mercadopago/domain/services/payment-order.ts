import { providePaymentOrderRepository } from "@/mock-mercadopago/adapters/output/payment"
import { PaymentOrderRepositoryPort } from "@/mock-mercadopago/ports/repository/payment"
import { PaymentOrderServicePort } from "@/mock-mercadopago/ports/services/payment-order"
import { PaymentOrder } from "../entities/payment-order"
import { v4 as uuidv4 } from 'uuid'
import { provideWebhook } from "@/mock-mercadopago/adapters/output/webhook"
import { WebhookPort } from "@/mock-mercadopago/ports/webhook/webhook"

export class PaymentOrderService implements PaymentOrderServicePort {
  private paymentOrderRepository: PaymentOrderRepositoryPort
  private webhookOutput: WebhookPort

  constructor() {
    this.paymentOrderRepository = providePaymentOrderRepository
    this.webhookOutput = provideWebhook
  }
  async generate(totalPrice: number): Promise<{ qrData: string; payment_id: string }> {
    const qrData = "00020101021243650016COM.MERCADOLIBRE02013063638f1192a-5fd1-4180-a180-8bcae3556bc35204000053039865802BR5925IZABEL AAAA DE MELO6007BARUERI62070503***63040B6D"

    const paymentId = uuidv4()

    const paymentOrder = new PaymentOrder(paymentId, qrData, false)

    await this.paymentOrderRepository.create(paymentOrder)

    return { qrData, payment_id: paymentId };

  }
  async verify(paymentId: string) {
    console.log({ paymentId })
    const response = await this.paymentOrderRepository.getById(paymentId)

    return response
  }
  async confirmPayment(paymentId: string) {
    await this.paymentOrderRepository.confirm(paymentId)

    await this.webhookOutput.confirmPayment(paymentId)
  }
}

export const providePaymentOrderService = new PaymentOrderService();
