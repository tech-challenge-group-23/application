import { PaymentOrderServicePort } from "@/api/ports/services/payment-order";
import { PaymentOrder } from "../entities/payment-order";

export class PaymentOrderService implements PaymentOrderServicePort {
  generate(orderId: number, totalPrice: number): string {
    const qrData = "00020101021243650016COM.MERCADOLIBRE02013063638f1192a-5fd1-4180-a180-8bcae3556bc35204000053039865802BR5925IZABEL AAAA DE MELO6007BARUERI62070503***63040B6D"


    const paymentOrder = new PaymentOrder(orderId, qrData)
    return qrData;

  }
}

export const providePaymentOrderService = new PaymentOrderService();
