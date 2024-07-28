import { Router } from 'express';
import { providePaymentStatusController } from '../controllers'

const route = Router();

route.post('/', (req, res) => providePaymentStatusController.verifyStatus(req, res))

export default route
