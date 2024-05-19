import { Customer } from "@/domain/entities/customer-entity";
import { CustomerRepositoryPort } from "@/ports/postgres/customer-repository-port";
import { AppDataSource } from "..";


export class CustomerRepository implements CustomerRepositoryPort {
    // constructor() { }

    async save(customer: Customer): Promise<Customer> {

        try {
            const insertCustomer = await AppDataSource
            .createQueryBuilder()
            .insert()
            .into(Customer)
            .values([
                { name: customer.name, cpf: customer.cpf, email: customer.email, created_at: new Date() }
            ])
            .returning(["id", "name", "cpf", "email", "createdAt"])
            .execute()
    
            const result = {
                id: insertCustomer.raw[0].id,
                name: insertCustomer.raw[0].name,
                cpf: insertCustomer.raw[0].cpf,
                email: insertCustomer.raw[0].email,
                createdAt: insertCustomer.raw[0].created_at
            }
    
            return result
            
        } catch(error) {
            if(error instanceof Error)
                throw new Error(`Erro ao incluir cliente: ${error.message}`)
            throw new Error(`Erro ao incluir cliente: ${error}`)
        }

    }

    async searchByCpf(paramCpf: string): Promise<Customer> {
        try{

            const searchCpf = await AppDataSource
            .createQueryBuilder()
            .select("customer")
            .from(Customer, "customer")
            .where("customer.cpf = :cpf", {cpf: paramCpf})
            .getOneOrFail()
    
            // const result = {
            //     id: searchCpf?.id,
            //     name: searchCpf.name,
            //     cpf: searchCpf.cpf,
            //     email: searchCpf.email,
            //     createdAt: searchCpf.created_at
    
            // }
            console.log(searchCpf)
    
            return searchCpf
            
        } catch(error) {
            if(error instanceof Error)
                throw new Error(`Erro ao incluir cliente: ${error.message}`)
            throw new Error(`Erro ao incluir cliente: ${error}`)
        }
    }
}

export const provideCustomerRepository = new CustomerRepository();
