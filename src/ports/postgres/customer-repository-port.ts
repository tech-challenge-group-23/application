import { Customer } from "@/domain/entities/customer-entity";

export interface CustomerRepositoryPort {
    save(customer: Customer): Promise<Customer>
}