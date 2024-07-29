import { Payment } from "../domain/entities/payment";

export interface MercadoPagoPort {
    generatePayment(totalPrice: number): Promise<Payment>
}
