import { Payment } from '@/restaurant-manager/domain/entities/payment';
import { MercadoPagoPort } from '@/restaurant-manager/ports/mercadopago';
import axios from 'axios';
import { MERCADOPAGO_DNS, MERCADOPAGO_PORT } from 'env';

export class MercadoPago implements MercadoPagoPort {
  async generatePayment(totalPrice: number): Promise<Payment> {
    try {
      const response = await axios.post(`http://${MERCADOPAGO_DNS}:${MERCADOPAGO_PORT}/qr-code`, {totalPrice: totalPrice}, {
        headers: {
            'Content-Type': 'application/json',
        },
      });

      return {
        id: response.data.id,
        qrCode: response.data.qr_data
      }
    } catch (error) {
      console.log(error)
      throw new Error(`Error generating QRCode: ${error}`);
    }
  }
}

export const provideMercadoPago = new MercadoPago();
