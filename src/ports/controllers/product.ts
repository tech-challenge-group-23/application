import { Request, Response } from 'express';
 
export interface ProductControllerPort {
  createProduct(req: Request, res: Response): Promise<Response>
  deleteProduct(req: Request, res: Response): Promise<Response>
  listProductsByCategory(req: Request, res: Response): Promise<Response>
}

  