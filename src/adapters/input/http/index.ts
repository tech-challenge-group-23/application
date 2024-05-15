import express from 'express';
import cors from './middlewares/cors';
import morgan from 'morgan';
import { APP_PORT } from '../../../env';
import { productRoutes } from '@/adapters/input/http/routes/product'

const app = express();


app.use('/products', productRoutes);

function initApp() {
  app.listen(APP_PORT, () => {
    console.log('running on port: ', APP_PORT);
  });
}

initApp();



