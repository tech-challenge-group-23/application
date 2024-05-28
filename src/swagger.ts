import { APP_PORT } from './env'

const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "My API",
        description: "Some description..."
    },
    servers: [
        {
            url: `http://localhost:${APP_PORT}`
        }
    ],
    components: {
        schemas: {
            customerBody: {
                id: 1,
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
                categoryId: 1,
                name: "lanche",
                description: "descrição",
                price: 30.50
            },
            producResponse: {
                id: 1,
                categoryId: 1,
                name: "lanche",
                description: "descrição",
                price: 30.50,
                image: null,
                created_at: "2024-05-28T01:25:58.453Z",
                updated_at: "2024-05-28T01:25:58.453Z"
            },
            orderBody: {
                id: 1,
                $customerId: 1,
                $command: 2,
                $orderStatus: "recebido",
                $totalPrice: 30.50,
                $items: [
                    {
                        productId: 1,
                        quantity: 1,
                        productName: "lanche",
                        price: 30.50,
                        notes: ""
                    }
                ],
                $orderUpdatedAt: "2024-05-28T01:25:58.453Z",
                $createdAt: "2024-05-28T01:28:58.453Z"
            },
            orderResponse: {
                id: 1,
                customerId: 1,
                $command: 2,
                $orderStatus: "recebido",
                $totalPrice: 30.50,
                $items: [
                    {
                        productId: 1,
                        quantity: 1,
                        productName: "lanche",
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
