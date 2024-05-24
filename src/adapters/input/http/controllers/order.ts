import { OrderItem, OrderRequest, Order, OrderStatus, OrderItemRequest } from "@/domain/entities/order";
import { provideOrderService } from "@/domain/services/order";
import { OrderControllerPort } from "@/ports/controllers/order";
import { OrderServicePort } from "@/ports/services/order";
import { validateOrderRequest } from "@/domain/services/request-validations/order";
import { Request, Response } from "express";
import { CustomerServicePort } from "@/ports/services/customer";
import { provideCustomerService } from "@/domain/services/customer";

export class OrderController implements OrderControllerPort {
    private orderService: OrderServicePort
    private customerService: CustomerServicePort

    constructor() {
        this.orderService = provideOrderService
        this.customerService = provideCustomerService
    }

    async createOrder(req: Request, res: Response): Promise<Response> {
      try{
        const customer = await this.customerService.searchById(req.body.customer_id)
        const isCustomer = customer != null;
        const validationErrors = validateOrderRequest(req.body, isCustomer);

        if (validationErrors.length > 0) {
          return res.status(400).json({ errors: validationErrors });
        }

        const response = await this.orderService.create(req.body);
        return res.status(201).json(response);

      } catch (error) {
        console.error("Error creating order: ", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }

    async getOrderById(req: Request, res Response): Promise<Response> {
      try{
        const orderId = Number(req.params.id)
        const response = await this.orderService.getById(orderId)
        // TODO continuar daqui....


      }
    }

}

export const provideOrderController = new OrderController()
