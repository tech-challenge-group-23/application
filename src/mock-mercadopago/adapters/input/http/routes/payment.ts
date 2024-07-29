import { Router } from 'express';
import { providePaymentController } from '../controllers/payment';

const paymentRoutes = Router();


paymentRoutes.post("/qr-code", (req, res) =>  providePaymentController.generatePaymentOrder(req, res));
paymentRoutes.get("/payment-status/:id", (req, res) =>  providePaymentController.verifyPaymentOrder(req, res));
paymentRoutes.put("/confirm-payment/:id", (req, res) =>  providePaymentController.confirmPayment(req, res));


export default paymentRoutes;
