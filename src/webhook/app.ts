import express from 'express';
import cors from './adapters/input/http/middlewares/cors';
import morgan from 'morgan';
import paymentStatusRoute from './adapters/input/http/routes';
import { WEBHOOK_PORT } from 'env';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

app.use('/payment-status', paymentStatusRoute);

app.listen(WEBHOOK_PORT, () => {
  console.log('running on: ', `http://localhost:${WEBHOOK_PORT}`);
});
