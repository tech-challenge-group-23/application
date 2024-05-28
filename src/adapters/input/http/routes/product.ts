import express, { Request, Response } from 'express';
import { provideProductController } from '@/adapters/input/http/controllers/product';
import multer from 'multer';
import ProductValidator from '@/domain/services/product-validation/edit';

const productRoutes = express.Router();

const upload = multer();

productRoutes.post('/', upload.single('image'), (req: Request, res: Response) => {
  provideProductController.createProduct(req, res);
});
productRoutes.delete('/:id', (req: Request, res: Response) => {
  provideProductController.deleteProduct(req, res);
});
productRoutes.put(
  '/:id',
  upload.single('image'),
  ProductValidator.editProduct,
  (req: Request, res: Response) => {
    provideProductController.editProduct(req, res);
  },
);
productRoutes.get('/categories/:id', (req: Request, res: Response) => {
  provideProductController.listProductsByCategory(req, res);
});

export default productRoutes;
