import { RestaurantApiPort } from "@/webhook/ports/restaurant-api/restaurant-api"
import axios from "axios"
import { RESTAURANT_API_URL } from "env"



class RestaurantApi implements RestaurantApiPort {
  async updatePaymentStatus(paymentId: string) {
    try {
      const response = await axios.put(`${RESTAURANT_API_URL}/orders/${paymentId}/payment-status`)

      return response
    } catch {
      throw new Error('Failed to update payment status')
    }
  }
}

export const provideRestaurantApi = new RestaurantApi()
