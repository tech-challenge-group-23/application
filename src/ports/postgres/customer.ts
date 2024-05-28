import { Customer } from "@/domain/entities/customer";

export interface CustomerRepositoryPort {
    save(customer: Customer): Promise<Customer>
    searchByCpf(paramCpf: string): Promise<Customer | string>
    searchById(id: number): Promise<Customer | null>
}
