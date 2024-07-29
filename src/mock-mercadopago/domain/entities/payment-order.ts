export class PaymentOrder {
  id: string;
  qrData: string;
  paymentStatus: boolean;

  constructor(id: string, qrData: string, paymentStatus: boolean) {
    this.id = id
    this.qrData = qrData
    this.paymentStatus = paymentStatus
  }
}
