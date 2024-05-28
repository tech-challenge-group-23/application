import { APP_PORT } from './env'

const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "API - Tech Challenge",
        description: "API - Tech Challenge"
    },
    servers: [
        {
            url: `http://localhost:${APP_PORT}`
        }
    ],
    components: {
        schemas: {
            customerBody: {
                $name: "Gisele Cesar",
                $cpf: "12345678910",
                $email: "teste@email.com",
                created_at: "2024-05-28T01:25:58.453Z"
            },
            customerResponse: {
                id: 1,
                name: "Gisele Cesar",
                cpf: "12345678910",
                email: "teste@email.com",
                created_at: "2024-05-28T01:25:58.453Z"
            },
            productBody: {
                $categoryId: 1,
                $name: "lanche",
                $description: "descrição",
                $price: 30.50,
                image: "bytea.jpeg"
            },
            producResponse: {
                id: 1,
                categoryId: 1,
                name: "lanche",
                description: "descrição",
                price: 30.50,
                image: "bytea.jpeg",
                created_at: "2024-05-28T01:25:58.453Z",
                updated_at: "2024-05-28T01:25:58.453Z"
            },
            orderBody: {
                $customer_id: 1,
                $command: 2,
                $order_status: "recebido",
                $total_price: 30.50,
                $items: [
                    {
                        product_id: 1,
                        quantity: 1,
                        product_name: "lanche",
                        price: 30.50,
                        notes: ""
                    }
                ],
                $orderUpdatedAt: "2024-05-28T01:25:58.453Z",
                $createdAt: "2024-05-28T01:28:58.453Z"
            },
            orderResponse: {
                id: 1,
                customer_id: 1,
                $command: 2,
                $order_status: "recebido",
                $total_price: 30.50,
                $items: [
                    {
                        product_id: 1,
                        quantity: 1,
                        product_name: "lanche",
                        price: 30.50,
                        notes: ""
                    }
                ],
                $orderUpdatedAt: "2024-05-28T01:25:58.453Z",
                $createdAt: "2024-05-28T01:28:58.453Z"
            }
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = [
    './adapters/input/http/routes/customer.ts',
    './adapters/input/http/routes/product.ts',
    './adapters/input/http/routes/order.ts'
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./adapters/input/http/app');
});
