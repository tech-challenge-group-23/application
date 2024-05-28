import express, { Request, Response } from 'express';
import { provideOrderController } from '../controllers/order';

export const orderRoutes = express.Router();

orderRoutes.get("/",  (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Order']
    #swagger.summary = 'Returns the order by customer and by status.'
    #swagger.description = 'This endpoint will return the order by customer and by status.'

    #swagger.security = [{
        "bearerAuth": []
    }]
  */
  provideOrderController.getOrders(req, res)});

orderRoutes.get("/:id", (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Order']
    #swagger.summary = 'Returns a order by Id.'
    #swagger.description = 'This endpoint will return a order by Id.'

    #swagger.security = [{
        "bearerAuth": []
    }]
  */
  provideOrderController.getOrderById(req, res)});

orderRoutes.post("/", (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Order']
    #swagger.summary = 'Returns a created order.'
    #swagger.description = 'This endpoint will return a order json.'

    #swagger.security = [{
        "bearerAuth": []
    }]
  */
  provideOrderController.createOrder(req, res)});

orderRoutes.put("/:id/status",  (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Order']
    #swagger.summary = 'Returns the order status change.'
    #swagger.description = 'This endpoint will return the order status change.'

    #swagger.security = [{
        "bearerAuth": []
    }]
  */
  provideOrderController.updateStatus(req, res)});
