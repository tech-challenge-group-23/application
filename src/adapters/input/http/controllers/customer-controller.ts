import { Customer } from "@/domain/entities/customer-entity";
import { provideCustomerService } from "@/domain/services/customer-service";
import { CustomerControllerPort } from "@/ports/controllers/customer-controller-port";
import { CustomerServicePort } from "@/ports/services/customer-service-port";
import { validateCustomerName, validationCpf, validationRequest } from "aux/helpers/customer-validations/request-validation";
import { Request, Response } from "express";


export class CustomerController implements CustomerControllerPort {
    private customerService: CustomerServicePort

    constructor() {
        this.customerService = provideCustomerService
    }

    // DONE: validação de nome: (name) -> validar caracteres especiais, primeira letra maiuscula e o resto minúscula em cada string, remover espaços extras, obrigatório;
    // TO DO: add rotas customer no swagger
    // TO DO: remover created_at: new Date() do repository: dá erro "null value in column "created_at" of relation "customer" violates not-null constraint"
    // TO DO: add rota customer/getAll()???
    // TO DO: add rota customer/getById()???

    async createCustomer(req: Request, res: Response): Promise<Response> {

        const customer: Customer = {
            name: req.body.name,
            cpf: req.body.cpf,
            email: req.body.email,
        }

        const validation = validationRequest(customer)

        if (validation !== true) {
            return res.status(400).send(validation)
        } else {

            try {
                customer.name = validateCustomerName(customer.name)
                const response = await this.customerService.create(customer)

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
