import { CustomerRepositoryPort } from "@/ports/postgres/customer";
import { CustomerServicePort } from "@/ports/services/customer";
import Customer from "../entities/customer";
import { provideCustomerRepository } from "@/adapters/output/postgres/customer";


export class CustomerService implements CustomerServicePort {
    private customerRepository: CustomerRepositoryPort

    constructor() {
        this.customerRepository = provideCustomerRepository
    }

    async create(customer: Customer): Promise<void> {

        const result = this.customerRepository.save(customer)
        console.log("passou pelo CustomerService", result)
        // add regra de validação de CPF: Tamanho 11, formato(11111111111), number, cálculo do cpf
        // add regra de validação de email: validar formato do e-mail com regex
        // add regra de validação de caracteres especiais, primeira letra maiuscula e o resto  em cada string, remover espaços extras
        
    }
}

export const provideCustomerService = new CustomerService()