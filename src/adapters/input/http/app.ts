import express, { Request, Response } from 'express';
import cors from './middlewares/cors';
import morgan from 'morgan';
import { APP_PORT } from '../../../env';
import { productRoutes } from '@/adapters/input/http/routes/product'

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

app.use('/products', productRoutes);

function initApp() {
  app.listen(APP_PORT, () => {
    console.log('running on port: ', APP_PORT);
  });
}

module.exports = {
  initApp
};


