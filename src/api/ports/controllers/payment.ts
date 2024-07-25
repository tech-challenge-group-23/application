import { Request, Response } from "express"

export interface PaymentControllerPort {
  generatePaymentOrder(req: Request, res: Response): Promise<Response>
  verifyPaymentOrder(req: Request, res: Response): Promise<Response>
}
