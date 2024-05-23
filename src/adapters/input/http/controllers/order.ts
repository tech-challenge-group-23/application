import { OrderItem, OrderRequest } from "@/domain/entities/order";
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

      const orderRequest: OrderRequest = this.adaptToOrderRequest(req.body);
      const validationErrors = validateOrderRequest(orderRequest);

        if (validationErrors.length > 0) {
            return res.status(400).send(validationErrors)
        }

        //TODO add searchById em customer para validar se o customer o pedido é valido
        //const customer = await this.customerService.searchById(req.body.customer_id);

        else {
          const response = await this.orderService.create(orderRequest)

          return res.status(201).send(response)
        }
    }

    private adaptToOrderRequest(request:any): OrderRequest {
      return {
        customerId: request.customer_id,
        command: request.command,
        orderStatus: request.order_status,
        totalPrice: request.total_price,
        items: request.items.map((item: any) => ({
          productId: item.product_id,
          quantity: item.amount,
          productName: item.product_name,
          price: item.price,
          notes: item.observation
        }))
      }
    }

    // async getOrderById(req: Request, res: Response): Promise<Response> {


    // }
}

export const provideOrderController = new OrderController()
