import { CustomerRepositoryPort } from "@/ports/postgres/customer";
import { CustomerServicePort } from "@/ports/services/customer";
import { Customer } from "../entities/customer";
import { provideCustomerRepository } from "@/adapters/output/postgres/customer";


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
                throw new Error(`Error adding customer: ${error.message}`)
            throw new Error(`Error adding customer: ${error}`)
        }

    }

    async searchByCpf(cpf: string): Promise<Customer> {
        try{
            const result = await this.customerRepository.searchByCpf(cpf)
            return result
        } catch(error) {
            if(error instanceof Error)
                throw new Error(`Error when searching for cpf: ${error.message}`)
            throw new Error(`Error when searching for cpf: ${error}`)
        }


    }
}

export const provideCustomerService = new CustomerService()
