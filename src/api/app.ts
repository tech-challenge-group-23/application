import express from 'express';
import cors from './adapters/input/http/middlewares/cors';
import morgan from 'morgan';


import paymentRoutes from './adapters/input/http/routes/payment';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));


app.use('/qr-code', paymentRoutes);

app.listen(3004, () => {
  console.log('running on: ', `http://localhost:${3004}`);
});
