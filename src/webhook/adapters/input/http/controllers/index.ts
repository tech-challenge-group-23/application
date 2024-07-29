import { Request, Response } from "express";
import { providePaymentStatusService } from "@/webhook/domain/services";
import { PaymentStatusServicePort } from "@/webhook/ports/services";
import { PaymentStatusControllerPort } from "@/webhook/ports/controllers";

export class PaymentStatusController implements PaymentStatusControllerPort {
  private providePaymentStatusService: PaymentStatusServicePort

  constructor() {
    this.providePaymentStatusService = providePaymentStatusService;
  }

  async updatePaymentStatus(req: Request, res: Response): Promise<Response> {
    try {
      const paymentId = req.body.id;

      await this.providePaymentStatusService.updatePaymentStatus(paymentId)

      return res.status(200).send({ message: 'order status updated sucessfully' });
    } catch {
      return res.status(400).send({ message: 'order status update failed' });
    }

  }
}


export const providePaymentStatusController = new PaymentStatusController();
