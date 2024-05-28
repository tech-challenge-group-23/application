import { Customer } from "@/domain/entities/customer";
import { provideCustomerService } from "@/domain/services/customer";
import { CustomerControllerPort } from "@/ports/controllers/customer";
import { CustomerServicePort } from "@/ports/services/customer";
import { validateCustomerName, validationCpf, validationCustomerRequest } from "@/adapters/input/http/controllers"
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

        const validation = validationCustomerRequest(customer)

        if (validation !== true) {
            return res.status(400).send(validation)
        } else {
            try {
                customer.name = validateCustomerName(customer.name)
                const response = await this.customerService.create(customer)

                if (response === `CPF number already registered.`) {
                    return res.status(400).send(response)
                }

                return res.status(201).send(response)

            } catch (error) {
                return res.status(500).send(error)
            }
        }
    }

    async searchCustomerByCpf(req: Request, res: Response): Promise<Response> {
        const cpf = req.params.cpf
        const validation = validationCpf(cpf)

        if (validation !== true) {
            return res.status(400).send(validation)
        } else {
            try {
                const response = await this.customerService.searchByCpf(cpf)

                if (response === `CPF not registered in the base.`) {
                    return res.status(400).send(response)
                }

                return res.status(200).send(response)

            } catch (error) {
                if (error !== undefined) {
                    return res.status(400).send(error)
                }
                return res.status(500).send(error)
            }
        }
    }
}

export const provideCustomerController = new CustomerController()
