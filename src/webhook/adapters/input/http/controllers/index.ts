import { Request, Response } from "express";

interface PaymentStatusControllerPort {
  verifyStatus(req: Request, res: Response): Promise<any>
}

export class PaymentStatusController implements PaymentStatusControllerPort {
  verifyStatus(req: Request, res: Response): Promise<any> {

    throw new Error("Method not implemented.");
  }
}


export const providePaymentStatusController = new PaymentStatusController();
