export interface PaymentOrder {
  id: number;
  qrData: string;
  paymentStatus: boolean;
}

export interface PaymentOrderRepositoryPort {
  create({ id, qrData, paymentStatus }: PaymentOrder): Promise<boolean>
  getById(id: number): Promise<PaymentOrder>
}
