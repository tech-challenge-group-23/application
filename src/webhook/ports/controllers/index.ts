import { Request, Response } from "express";

export interface PaymentStatusControllerPort {
  updatePaymentStatus(req: Request, res: Response): Promise<Response>
}
