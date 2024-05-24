import { Request, Response } from 'express';

export interface OrderControllerPort {
    createOrder(req: Request, res: Response): Promise<Response>
    getOrderById (req: Request, res: Response): Promise<Response>
    getOrders (req: Request, res: Response): Promise<Response>
}
