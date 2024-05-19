import { Customer } from '@/domain/entities/customer-entity';
import { Request, Response } from 'express';

export interface CustomerControllerPort {
    createCustomer(req: Request, res: Response): Promise<Response>
}