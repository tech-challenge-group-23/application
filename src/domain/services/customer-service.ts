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

            return result;

        } catch(error) {
            if(error instanceof Error)
                throw new Error(`Erro ao incluir cliente: ${error.message}`)
            throw new Error(`Erro ao incluir cliente: ${error}`)
        }
        
    }

    async searchByCpf(cpf: string): Promise<Customer> {
        try{
            const result = await this.customerRepository.searchByCpf(cpf)
            return result
        } catch(error) {
            if(error instanceof Error)
                throw new Error(`Erro ao buscar cpf: ${error.message}`)
            throw new Error(`Erro ao buscar cpf: ${error}`)
        }


    }
}

export const provideCustomerService = new CustomerService()