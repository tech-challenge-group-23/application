import { Customer }  from "@/domain/entities/customer-entity";
import { provideCustomerService } from "@/domain/services/customer-service";
import { CustomerControllerPort } from "@/ports/controllers/customer-controller-port";
import { CustomerServicePort } from "@/ports/services/customer-service-port";
import { validationRequest } from "aux/helpers/customer-validations/request-validation";
import { Request, Response } from "express";


export class CustomerController implements CustomerControllerPort {
    private customerService: CustomerServicePort

    constructor() {
        this.customerService = provideCustomerService

    }
    
    async createCustomer(req: Request, res: Response): Promise<Response> {
        
        const customer: Customer = {
            name: req.body.name,
            cpf: req.body.cpf,
            email: req.body.email,
        }

        const validation = validationRequest(customer)

        if(validation === true) {
            try {                
                const response = await this.customerService.create(customer)
    
                console.log("controler", response)
    
                return res.status(201).send(response)
               
    
            } catch (error) {
                console.log("tratar erros aqui", error)
                return res.status(400).send(error)
                // res.status(400).json({error: error})
            }
        } else {
            console.log("não passou na validação")
            return res.status(400).send(validation)
           
        }
    }
}

export const provideCustomerController = new CustomerController()
