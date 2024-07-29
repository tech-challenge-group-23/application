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
    const totalPrice = Number(req.body.totalPrice);

    const response = await this.paymentOrderService.generate(totalPrice);

    return res.status(200).send(response)
  }

  async confirmPayment(req: Request, res: Response): Promise<any> {
    const paymentId = req.params.id

    await this.paymentOrderService.confirmPayment(paymentId)

    return res.status(200).send({ message: 'success' })
  }

  async verifyPaymentOrder(req: Request, res: Response): Promise<Response> {
    const paymentId = req.params.id;
    const paymentOrder = await this.paymentOrderService.verify(paymentId)

    return res.status(200).send(paymentOrder)
  }
}

export const providePaymentController = new PaymentController();
