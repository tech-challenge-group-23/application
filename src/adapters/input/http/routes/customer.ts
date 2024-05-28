import express, { Request, Response } from 'express';
import { provideCustomerController } from '../controllers/customer';

export const customerRoutes = express.Router();


customerRoutes.post("/", (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Customer']
    #swagger.summary = 'Returns a created customer.'
    #swagger.description = 'This endpoint will return a customer json'
  */
  /*  #swagger.requestBody = {
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
  provideCustomerController.createCustomer(req, res)
});

customerRoutes.get("/:cpf", (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Customer']
    #swagger.summary = 'Returns a customer when searching for cpf.'
    #swagger.description = 'This endpoint will return a customer  json when searching for cpf.'
  */
  /*  #swagger.responses[200] = {
                description: "Some description...",
                content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/customerResponse"
                        }
                    }
                }
            }
  */
  provideCustomerController.searchCustomerByCpf(req, res)
});
