import { Router } from 'express';
import { providePaymentController } from '../controllers/payment';

const paymentRoutes = Router();


paymentRoutes.post("/", (req, res) =>  providePaymentController.generatePaymentOrder(req, res));


export default paymentRoutes;
