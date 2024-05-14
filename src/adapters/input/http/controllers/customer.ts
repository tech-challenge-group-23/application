import Customer from "@/domain/entities/customer";
import { CustomerService, provideCustomerService } from "@/domain/services/customer";
import { CustomerControllerPort } from "@/ports/controllers/customer";
import { CustomerServicePort } from "@/ports/services/customer";
import { debug } from "console";
import { Request, Response } from "express";


export class CustomerController implements CustomerControllerPort {
    constructor(private readonly customerService: CustomerService
    ) {
        this.customerService = customerService

    }
    
    
    async createCustomer(req: Request, res: Response): Promise<void> {
        debug
        try {
            const customer: Customer = {
                name: req.body.name,
                cpf: req.body.cpf,
                email: req.body.email
            }

            console.log("passou no CustomerController", customer)
            // add aqui a lógica de chamada e direcionamento para a service
            this.customerService.create(customer)
           

        } catch (error) {
            console.log("tratar erros aqui", error)
        }
    }
}

export const provideCustomerController = new CustomerController(provideCustomerService)
