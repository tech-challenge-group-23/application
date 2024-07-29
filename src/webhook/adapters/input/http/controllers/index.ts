import { Request, Response } from "express";
import { providePaymentStatusService } from "@/webhook/domain/services";
import { PaymentStatusServicePort } from "@/webhook/ports/services";
import { PaymentStatusControllerPort } from "@/webhook/ports/controllers";

export class PaymentStatusController implements PaymentStatusControllerPort {
  private providePaymentStatusService: PaymentStatusServicePort

  constructor() {
    this.providePaymentStatusService = providePaymentStatusService;
  }

  async updateOrderStatus(req: Request, res: Response): Promise<Response> {
    const orderId = Number(req.body.orderId);

    try {
      await this.providePaymentStatusService.updateOrderStatus(orderId)

      return res.status(200).send({ message: 'order status updated sucessfully' });
    } catch {
      return res.status(400).send({ message: 'order status update failed' });
    }

  }
}


export const providePaymentStatusController = new PaymentStatusController();
