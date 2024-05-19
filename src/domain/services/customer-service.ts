import { CustomerRepositoryPort } from "@/ports/postgres/customer-repository-port";
import { CustomerServicePort } from "@/ports/services/customer-service-port";
import { Customer } from "../entities/customer-entity";
import { provideCustomerRepository } from "@/adapters/output/postgres/customer-repository";


export class CustomerService implements CustomerServicePort {
    private customerRepository: CustomerRepositoryPort

    constructor() {
        this.customerRepository = provideCustomerRepository
    }

    async create(customer: Customer): Promise<Customer> {

        try{
            const result = await this.customerRepository.save(customer)
            // console.log("trouxe result na service", result)
            // add regra de validação de CPF: Tamanho 11, formato(11111111111), number, cálculo do cpf
            // add regra de validação de email: validar formato do e-mail com regex
            // add regra de validação de caracteres especiais, primeira letra maiuscula e o resto  em cada string, remover espaços extras
            return result;

        } catch(error) {
            if(error instanceof Error)
                throw new Error(`Erro ao incluir cliente: ${error.message}`)
            throw new Error(`Erro ao incluir cliente: ${error}`)
        }
        
    }
}

export const provideCustomerService = new CustomerService()