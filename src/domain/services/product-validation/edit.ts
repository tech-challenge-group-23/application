import { NextFunction, Request, Response } from 'express';

export default class ProductValidator {
  static editProduct(req: Request, res: Response, next: NextFunction) {
    const bodyRequest = req.body;
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).send({ message: 'product id must be a number' });
    }

    if (
      bodyRequest.categoryId ||
      bodyRequest.name ||
      bodyRequest.description ||
      bodyRequest.price ||
      req.file
    ) {
      return next();
    }

    return res.status(400).send({ message: 'invalid body request' });
  }
}
