import Customer from "@/domain/entities/customer-domain";


export interface CustomerServicePort {
    create(customer: Customer): Promise<Customer>
}