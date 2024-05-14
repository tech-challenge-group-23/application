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
        
    }
}

export const provideCustomerService = new CustomerService()