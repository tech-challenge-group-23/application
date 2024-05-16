import { CustomerRepositoryPort } from "@/ports/postgres/customer-repository-port";
import { CustomerServicePort } from "@/ports/services/customer-service-port";
import Customer from "../entities/customer-domain";
import { provideCustomerRepository } from "@/adapters/output/postgres/customer-repository";


export class CustomerService implements CustomerServicePort {
    private customerRepository: CustomerRepositoryPort

    constructor() {
        this.customerRepository = provideCustomerRepository
    }

    async create(customer: Customer): Promise<Customer> {

        console.log("passou pelo CustomerService")
        const result = this.customerRepository.save(customer)
        console.log("voltou do CustomerService")
        // add regra de validação de CPF: Tamanho 11, formato(11111111111), number, cálculo do cpf
        // add regra de validação de email: validar formato do e-mail com regex
        // add regra de validação de caracteres especiais, primeira letra maiuscula e o resto  em cada string, remover espaços extras
        return await result;
        
    }
}

export const provideCustomerService = new CustomerService()