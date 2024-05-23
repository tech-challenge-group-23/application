import { Request, Response } from 'express';

export interface OrderControllerPort {
    createOrder(req: Request, res: Response): Promise<Response>
}
