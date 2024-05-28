import { Request } from 'express';

export function validateUpdateRequest(req: Request): string[] {
  const bodyRequest = req.body;
  const productId = Number(req.params.id);
  const errors: string[] = [];

  if (isNaN(productId)) {
    errors.push('product id must be a number');
  }
  if (!bodyRequest.categoryId ||
    !bodyRequest.name ||
    !bodyRequest.description ||
    !bodyRequest.price ||
    !req.file) {
      errors.push('invalid body request')
  }
  return errors;
}
