import Customer from "@/domain/entities/customer";
import { CustomerRepositoryPort } from "@/ports/postgres/customer";


export class CustomerRepository implements CustomerRepositoryPort {
    constructor() {

    }

    async save(customer: Customer): Promise<Customer> {
        console.log("passou no CustomerRepository", customer)
        return customer;
    }
}

export const provideCustomerRepository = new CustomerRepository();
