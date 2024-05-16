import Customer from "@/domain/entities/customer-domain";

export interface CustomerRepositoryPort {
    save(customer: Customer): Promise<Customer>
}