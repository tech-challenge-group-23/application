import { WebhookPort } from "@/mock-mercadopago/ports/webhook/webhook";
import axios from "axios";
import { WEBHOOK_API_URL } from "env";


class Webhook  implements WebhookPort {
  async confirmPayment(paymentId: string) {
    try {
      await axios.post(`${WEBHOOK_API_URL}/confirm-payment`, { paymentId })
    } catch {
      throw new Error('Failed to confirm payment')
    }
  }
}

export const provideWebhook = new Webhook()
