import { Payment } from '@/restaurant-manager/domain/entities/payment';
import { MercadoPagoPort } from '@/restaurant-manager/ports/mercadopago';
import axios from 'axios';
import { MERCADOPAGO_URL } from 'env';

export class MercadoPago implements MercadoPagoPort {
  async generatePayment(totalPrice: number): Promise<Payment> {
    try {
      const response = await axios.post(`${MERCADOPAGO_URL}/qr-code`, {totalPrice: totalPrice}, {
        headers: {
            'Content-Type': 'application/json',
        },
      });

      return {
        id: response.data.payment_id,
        qrCode: response.data.qrData
      }
    } catch (error) {
      console.log(error)
      throw new Error(`Error generating QRCode: ${error}`);
    }
  }
}

export const provideMercadoPago = new MercadoPago();
