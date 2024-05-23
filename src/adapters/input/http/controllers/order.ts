import { OrderItem, OrderRequest, Order, OrderStatus, OrderItemRequest } from "@/domain/entities/order";
import { provideOrderService } from "@/domain/services/order";
import { OrderControllerPort } from "@/ports/controllers/order";
import { OrderServicePort } from "@/ports/services/order";
import { validateOrderRequest } from "@/domain/services/request-validations/order";
import { Request, Response } from "express";

export class OrderController implements OrderControllerPort {
    private orderService: OrderServicePort

    constructor() {
        this.orderService = provideOrderService
    }

    async createOrder(req: Request, res: Response): Promise<Response> {
      try{
        const validationErrors = validateOrderRequest(req.body);

          if (validationErrors.length > 0) {
              return res.status(400).json({ errors: validationErrors });
          }

          //TODO add searchById em customer para validar se o customer o pedido é valido
          //const customer = await this.customerService.searchById(req.body.customer_id);

          const response = await this.orderService.create(req.body);
          return res.status(201).json(response);

      } catch (error) {
        console.error("Error creating order: ", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }


    }
}

export const provideOrderController = new OrderController()
