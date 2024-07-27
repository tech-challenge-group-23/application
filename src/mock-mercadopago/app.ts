import express from 'express';
import cors from './adapters/input/http/middlewares/cors';
import morgan from 'morgan';
import paymentRoutes from './adapters/input/http/routes/payment';
import { MERCADOPAGO_PORT } from 'env';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

app.use('/', paymentRoutes);

app.listen(MERCADOPAGO_PORT, () => {
  console.log('running on: ', `http://localhost:${MERCADOPAGO_PORT}`);
});
