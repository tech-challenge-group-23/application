import { CustomerRepositoryPort } from "@/ports/postgres/customer";
import { CustomerServicePort } from "@/ports/services/customer";
import { Customer, CustomerServiceResponse } from "../entities/customer";
import { provideCustomerRepository } from "@/adapters/output/postgres/customer";


export class CustomerService implements CustomerServicePort {
    private customerRepository: CustomerRepositoryPort

    constructor() {
        this.customerRepository = provideCustomerRepository
    }

    async create(customer: Customer): Promise<CustomerServiceResponse> {
        try{
            const validation = customer.validateCustomer(customer);
            if (!validation) {
                return {
                    isValid: false,
                    message: validation
                };
            }

            customer.rewrittenCustomerName()

            const existsCpf = await this.customerRepository.searchByCpf(customer.cpf)
            if(existsCpf === undefined) {
                return {
                    isValid: false,
                    message: `CPF number already registered.`
                }
            } else {
                return {
                    customer: await this.customerRepository.save(customer)
                }
            }
        } catch(error) {
            if(error instanceof Error)
                throw new Error(`Error adding customer: ${error.message}`)
            throw new Error(`Error adding customer: ${error}`)
        }
    }

    async searchByCpf(cpf: string): Promise<CustomerServiceResponse> {
        try{
            const customer = await this.customerRepository.searchByCpf(cpf)
            if (customer === undefined) {
                return {
                    isValid: false,
                    message: `CPF number isn't exists`
                }
            }
            return {
                customer: customer
            }
        } catch(error) {
            if(error instanceof Error)
                throw new Error(`Error when searching for cpf: ${error.message}`)
            throw new Error(`Error when searching for cpf: ${error}`)
        }
    }

    async searchById(id: number): Promise<CustomerServiceResponse> {
        try{
            const customer = await this.customerRepository.searchById(id)
            if (customer === undefined) {
                return {
                    isValid: false,
                    message: `ID number isn't exists`
                }
            }
            return {
                customer: customer
            }
        } catch(error) {
            if(error instanceof Error)
                throw new Error(`Error when searching for cpf: ${error.message}`)
            throw new Error(`Error when searching for cpf: ${error}`)
        }
    }
}

export const provideCustomerService = new CustomerService()
