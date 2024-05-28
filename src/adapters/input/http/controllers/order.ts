import { UpdateOrderRequest } from "@/domain/entities/order";
import { provideOrderService } from "@/domain/services/order";
import { OrderControllerPort } from "@/ports/controllers/order";
import { OrderServicePort } from "@/ports/services/order";
import { validateOrderRequest, validateOrderStatus} from "@/adapters/input/http/controllers";
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
        return res.status(500).send("Failed to save the request.");
      }
    }

  async getOrderById(req: Request, res: Response): Promise<Response> {
    try{
      const orderId = Number(req.params.id)
      const response = await this.orderService.getById(orderId)

      if(!response){
        return res.status(404).send("Order id was not found");
      }

      return res.status(200).send(response)

    }catch (error) {
     console.error("Error fetching order by id: ", error);
     return res.status(500).send("Internal Server Error");
    }
  }

  async getOrders(req: Request, res: Response): Promise<Response> {
    try{
      const { order_status, customer_id } = req.query;

      const orderStatus: string | undefined = order_status ? order_status as string : undefined;
      const customerId: number | undefined = customer_id ? parseInt(customer_id as string) : undefined;
      const validationError: string[] = validateOrderStatus(orderStatus);

      if(validationError.length > 0) {
        return res.status(400).json({ errors: validationError });
      }

      const response = await this.orderService.findByFilters(orderStatus, customerId);

      if(!response){
        return res.status(404).send("Orders was not found");
      }

      return res.status(200).json(response)

    }catch (error){
      console.error("Error fetching orders:", error);
      return res.status(500).send("Internal Server Error");
    }
  }

  async updateStatus(req: Request, res: Response): Promise<Response> {
    try{

      const orderRequest: UpdateOrderRequest = {
        order_id: Number(req.params.id),
        order_status: req.body.order_status
      }

      const validationError = validateOrderStatus(orderRequest.order_status);

      if(validationError.length > 0) {
        return res.status(400).json({ errors: validationError });
      }

      await this.orderService.updateStatus(orderRequest);
      return res.status(200).send("Order status was updated")

    } catch (error){
      console.error("Error updating order:", error);
      return res.status(500).send("Internal Server Error");
    }
  }
}

export const provideOrderController = new OrderController()
