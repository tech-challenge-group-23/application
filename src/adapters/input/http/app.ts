import express from 'express';
import cors from './middlewares/cors';
import morgan from 'morgan';
import { APP_PORT } from '../../../env';
import { productRoutes } from '@/adapters/input/http/routes/product'
import { customerRoutes } from './routes/customer';
import { orderRoutes } from './routes/order';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

app.use('/products', productRoutes);

app.use('/customers', customerRoutes);

app.use('/orders', orderRoutes);

export function initApp() {
  app.listen(APP_PORT, () => {
    console.log('running on port: ', APP_PORT);
  });
}

module.exports = {
  initApp: initApp()
};
