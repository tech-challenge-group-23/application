
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
      version: "1.0.0",
      title: "My API",
      description: "Some description..."
  },
  servers: [
      {
          url: 'http://localhost:8080'
      }
  ],
  components: {
    schemas: {
        customerBody: {
            $name: "Gisele Cesar",
            $cpf: "12345678910",
            $email: "teste@email.com"
        },
        customerResponse: {
            id: 1,
            name: "Gisele Cesar",
            cpf: "12345678910",
            email: "teste@email.com",
            created_at: "2024-05-26"
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
            created_at: "2024-05-26",
            updated_at: "2024-05-26"
        }
    },
    securitySchemes:{
        bearerAuth: {
            type: 'http',
            scheme: 'bearer'
        }
    }
}
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
    './adapters/input/http/routes/customer.ts',
     './adapters/input/http/routes/product.ts'
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./adapters/input/http/app');
});
