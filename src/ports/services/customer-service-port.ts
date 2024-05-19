import { Customer } from "@/domain/entities/customer-entity";


export interface CustomerServicePort {
    create(customer: Customer): Promise<Customer>
}