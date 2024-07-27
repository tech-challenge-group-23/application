import { Customer } from "@/restaurant-manager/domain/entities/customer"

export interface CustomerRepositoryPort {
    save(customer: Customer): Promise<Customer>
    searchByCpf(paramCpf: string): Promise<Customer | undefined>
    searchById(id: number): Promise<Customer | undefined>
}
