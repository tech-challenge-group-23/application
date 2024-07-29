import { AxiosResponse } from "axios";

export interface RestaurantApiPort {
  updatePaymentStatus(paymentId: string): Promise<AxiosResponse>
}
