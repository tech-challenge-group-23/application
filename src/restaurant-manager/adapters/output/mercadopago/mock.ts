import { MercadoPagoPort } from '@/restaurant-manager/ports/mercadopago';
import axios from 'axios';
import { MERCADOPAGO_DNS, MERCADOPAGO_PORT } from 'env';

export class MercadoPago implements MercadoPagoPort {
  async generateQRCode(orderID: number, totalPrice: number): Promise<string> {
    try {
      const response = await axios.post(`http://${MERCADOPAGO_DNS}:${MERCADOPAGO_PORT}/qr-code`, {orderId: orderID, totalPrice: totalPrice}, {
        headers: {
            'Content-Type': 'application/json',
        },
      });

      return response.data.qr_data
    } catch (error) {
      console.log(error)
      throw new Error(`Error generating QRCode: ${error}`);
    }
  }
}

export const provideMercadoPago = new MercadoPago();
