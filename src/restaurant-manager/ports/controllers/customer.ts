import { Request, Response } from 'express';

export interface CustomerControllerPort {
    createCustomer(req: Request, res: Response): Promise<Response>
    searchCustomerByCpf(req: Request, res: Response): Promise<Response>
}