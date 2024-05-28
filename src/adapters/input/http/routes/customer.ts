import express, { Request, Response } from 'express';
import { provideCustomerController } from '../controllers/customer';

export const customerRoutes = express.Router();


customerRoutes.post("/", (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Customer']
    #swagger.summary = 'Returns a created customer.'
    #swagger.description = 'This endpoint will return a customer json'

    #swagger.security = [{
        "bearerAuth": []
    }]

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/customerBody"
          }
        }
      }
    }
  */

  provideCustomerController.createCustomer(req, res)});

customerRoutes.get("/:cpf",  (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Customer']
    #swagger.summary = 'Returns a customer when searching for cpf.'
    #swagger.description = 'This endpoint will return a customer  json when searching for cpf.'

    #swagger.security = [{
        "bearerAuth": []
    }]
  */
  provideCustomerController.searchCustomerByCpf(req, res)});
