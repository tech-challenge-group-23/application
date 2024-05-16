import Customer from "@/domain/entities/customer-domain";
import { CustomerService, provideCustomerService } from "@/domain/services/customer-service";
import { CustomerControllerPort } from "@/ports/controllers/customer-controller-port";
import { CustomerServicePort } from "@/ports/services/customer-service-port";
import { Request, Response } from "express";


export class CustomerController implements CustomerControllerPort {
    private customerService: CustomerServicePort
    

    constructor() {
        this.customerService = provideCustomerService

    }
    
    
    async createCustomer(req: Request, res: Response): Promise<void> {
        
        try {

            // const date: Date = new Date()

            const customer: Customer = {
                name: req.body.name,
                cpf: req.body.cpf,
                email: req.body.email,
                // created_at: date // se utilizar type orm, não precisa mandar pois cria por default
            }

            console.log("passou no CustomerController", customer)
            // add aqui a lógica de chamada e direcionamento para a service
            // add também tratamentos de erros
            // BAD REQUEST - name, cpf, email
            // INTERNAL - falha ao salvar user
            
            const response = this.customerService.create(customer)
    
            res.status(200).send(response)
           

        } catch (error) {
            console.log("tratar erros aqui", error)
            res.status(400).json({error: error})
        }
    }
}

export const provideCustomerController = new CustomerController()
