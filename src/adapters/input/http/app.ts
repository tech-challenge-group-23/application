import express from 'express';
import cors from './middlewares/cors';
import morgan from 'morgan';
import { APP_PORT } from '../../../env';
import { productRoutes } from './routes/product';
import { customerRoutes } from './routes/customer';
import { orderRoutes } from './routes/order';

import swaggerFile from '../../../swagger.json';

const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);

export function initApp() {
  app.listen(APP_PORT, () => {
    console.log('running on: ', `http://localhost:${APP_PORT}/api-docs`);
  });
}

module.exports = {
  initApp: initApp(),
};
