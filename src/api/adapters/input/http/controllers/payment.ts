import { providePaymentOrderService } from "@/api/domain/services/payment-order";
import { PaymentControllerPort } from "@/api/ports/controllers/payment";
import { PaymentOrderServicePort } from "@/api/ports/services/payment-order";
import { Request, Response } from "express";

export class Teste implements PaymentControllerPort {
  private paymentOrderService: PaymentOrderServicePort

  constructor() {
    this.paymentOrderService = providePaymentOrderService;
  }

  async generatePaymentOrder(req: Request, res: Response): Promise<Response> {
    const orderId = req.body.orderId;
    const totalPrice = req.body.totalPrice;

    const qrData = this.paymentOrderService.generate(orderId, totalPrice);

    return res.status(200).send({ qr_data: qrData })
  }

  verifyPaymentOrder(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
}

export const providePaymentController = new Teste();
