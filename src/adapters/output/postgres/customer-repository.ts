import Customer from "@/domain/entities/customer-domain";
import { CustomerRepositoryPort } from "@/ports/postgres/customer-repository-port";
import { Pool } from "pg";
import { connection } from "./connection";


export class CustomerRepository implements CustomerRepositoryPort {

    private pool: Pool
    // private date: Date = new Date()

    constructor() {
        this.pool = connection
        console.log(this.pool)
    }

    async save(customer: Customer): Promise<any> {
        // const client = await this.pool.connect();
        try {
            const query = `
                INSERT INTO customer
                (
                    name,
                    cpf,
                    email,
                    created_at
                )
                VALUES
                (
                    ${customer.name},
                    ${customer.cpf},
                    ${customer.email}
                )
            `

            const client = await this.pool.connect();

            console.log("query", query)

            const response = await client.query(query)

            // console.log("passou no CustomerRepository", customer)
            console.log("chegou no response", response.rows[0])

            client.release();
            return response.rows[0]


        } catch(error) {
            console.log(error)

        }
        // // add script de insert na base customer
        // return customer;
    }
}

export const provideCustomerRepository = new CustomerRepository();
