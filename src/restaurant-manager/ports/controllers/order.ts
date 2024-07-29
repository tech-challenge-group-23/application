import { Request, Response } from 'express';

export interface OrderControllerPort {
    createOrder(req: Request, res: Response): Promise<Response>
    getOrderById (req: Request, res: Response): Promise<Response>
    getOrdersByStatusAndCustomer (req: Request, res: Response): Promise<Response>
    updateStatus (req: Request, res: Response): Promise<Response>
    updatePaymentStatus(req: Request, res: Response): Promise<Response>
}
