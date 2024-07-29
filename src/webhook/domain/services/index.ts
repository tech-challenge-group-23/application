import { PaymentStatusServicePort } from "@/webhook/ports/services";
import axios, { AxiosResponse } from "axios";
import { RESTAURANT_API_URL } from "env";

class PaymentStatusService implements PaymentStatusServicePort {
  updateOrderStatus(orderId: number): Promise<AxiosResponse> {
     return axios.put(`${RESTAURANT_API_URL}/orders/${orderId}/status`, { order_status: 'recebido' })
  }
}

export const providePaymentStatusService = new PaymentStatusService();
