import { AxiosResponse } from "axios";

export interface PaymentStatusServicePort {
  updateOrderStatus(orderId: number): Promise<AxiosResponse>
}
