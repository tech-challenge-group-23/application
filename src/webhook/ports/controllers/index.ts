import { Request, Response } from "express";

export interface PaymentStatusControllerPort {
  updateOrderStatus(req: Request, res: Response): Promise<Response>
}
