import Customer from "@/domain/entities/customer";

export interface CustomerRepositoryPort {
    save(customer: Customer): Promise<Customer>
}