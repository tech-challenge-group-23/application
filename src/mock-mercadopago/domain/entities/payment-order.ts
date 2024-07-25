export class PaymentOrder {
  id: number;
  qrData: string;
  paymentStatus: boolean;

  constructor(id: number, qrData: string, paymentStatus: boolean) {
    this.id = id
    this.qrData = qrData
    this.paymentStatus = paymentStatus
  }
}

