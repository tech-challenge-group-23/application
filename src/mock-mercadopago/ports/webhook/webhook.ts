export interface WebhookPort {
  confirmPayment(paymentId: string): Promise<void>
}
