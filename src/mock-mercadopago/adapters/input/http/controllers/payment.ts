import { providePaymentOrderService } from "@/mock-mercadopago/domain/services/payment-order";
import { PaymentControllerPort } from "@/mock-mercadopago/ports/controllers/payment";
import { PaymentOrderServicePort } from "@/mock-mercadopago/ports/services/payment-order";
import { Request, Response } from "express";

export class PaymentController implements PaymentControllerPort {
  private paymentOrderService: PaymentOrderServicePort

  constructor() {
    this.paymentOrderService = providePaymentOrderService;
  }

  async generatePaymentOrder(req: Request, res: Response): Promise<Response> {
    const orderId = req.body.orderId;
    const totalPrice = req.body.totalPrice;

    const qrData = await this.paymentOrderService.generate(orderId, totalPrice);

    return res.status(200).send({ qr_data: qrData })
  }

  async verifyPaymentOrder(req: Request, res: Response): Promise<Response> {
    const orderId = req.params.orderId as unknown as number;
    const paymentOrder = await this.paymentOrderService.verify(Number(orderId))

    return res.status(200).send(paymentOrder)
  }
}

export const providePaymentController = new PaymentController();
