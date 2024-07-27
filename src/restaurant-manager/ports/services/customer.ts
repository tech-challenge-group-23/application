import { Customer, CustomerServiceResponse } from "@/restaurant-manager/domain/entities/customer"


export interface CustomerServicePort {
    create(customer: Customer): Promise<CustomerServiceResponse>
    searchByCpf(cpf: string): Promise<CustomerServiceResponse>
    searchById(id: number): Promise<CustomerServiceResponse>
}
