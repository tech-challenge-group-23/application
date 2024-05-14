import Customer from "@/domain/entities/customer";


export interface CustomerServicePort {
    create(customer: Customer): Promise<void>
}