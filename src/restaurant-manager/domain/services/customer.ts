import { provideCustomerRepository } from "@/restaurant-manager/adapters/output/postgres/customer";
import { CustomerRepositoryPort } from "@/restaurant-manager/ports/postgres/customer";
import { CustomerServicePort } from "@/restaurant-manager/ports/services/customer";
import { Customer, CustomerServiceResponse } from "../entities/customer";
import { validateCPF } from "validations-br";


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
            if(existsCpf !== undefined) {
                return {
                    isValid: false,
                    message: `CPF number already registered.`
                }
            } else {
                return {
                    isValid: true,
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
            if (!validateCPF(cpf)) {
                return {
                    message: `Invalid CPF`
                }
              }

            const customer = await this.customerRepository.searchByCpf(cpf)
            if (customer === undefined) {
                return {
                    message: `CPF number isn't exists`
                }
            }
            return {
                isValid: true,
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
                throw new Error(`Error when searching for id: ${error.message}`)
            throw new Error(`Error when searching for id: ${error}`)
        }
    }
}

export const provideCustomerService = new CustomerService()
