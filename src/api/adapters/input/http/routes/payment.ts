import { Router } from 'express';
import { providePaymentController } from '../controllers/payment';

const paymentRoutes = Router();


paymentRoutes.post("/qr-code", (req, res) =>  providePaymentController.generatePaymentOrder(req, res));
paymentRoutes.get("/payment-status/:orderId", (req, res) =>  providePaymentController.verifyPaymentOrder(req, res));


export default paymentRoutes;
