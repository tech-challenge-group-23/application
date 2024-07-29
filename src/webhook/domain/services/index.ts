import { provideRestaurantApi } from "@/webhook/adapters/output/restaurant-api";
import { RestaurantApiPort } from "@/webhook/ports/restaurant-api/restaurant-api";
import { PaymentStatusServicePort } from "@/webhook/ports/services";
import { AxiosResponse } from "axios";

class PaymentStatusService implements PaymentStatusServicePort {
  private provideRestaurantApi: RestaurantApiPort

  constructor(){
    this.provideRestaurantApi =  provideRestaurantApi
  }

  updatePaymentStatus(paymentId: string): Promise<AxiosResponse> {
    return this.provideRestaurantApi.updatePaymentStatus(paymentId);
  }
}

export const providePaymentStatusService = new PaymentStatusService();
