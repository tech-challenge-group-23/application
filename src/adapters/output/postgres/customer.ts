import { Customer } from '@/domain/entities/customer';
import { CustomerRepositoryPort } from '@/ports/postgres/customer';
import { AppDataSource } from '..';

export class CustomerRepository implements CustomerRepositoryPort {
  async save(customer: Customer): Promise<Customer> {
    try {
      const insertCustomer = await AppDataSource.createQueryBuilder()
        .insert()
        .into(Customer)
        .values([{ name: customer.name, cpf: customer.cpf, email: customer.email }])
        .returning(['id', 'name', 'cpf', 'email', 'createdAt'])
        .execute();

      const result = {
        id: insertCustomer.raw[0].id,
        name: insertCustomer.raw[0].name,
        cpf: insertCustomer.raw[0].cpf,
        email: insertCustomer.raw[0].email,
        createdAt: insertCustomer.raw[0].created_at,
      };

      return result;
    } catch (error) {
      if (error instanceof Error) throw new Error(`Error adding customer: ${error.message}`);
      throw new Error(`Error adding customer: ${error}`);
    }
  }

  async searchByCpf(paramCpf: string): Promise<Customer> {
    try {
      const searchCpf = await AppDataSource.createQueryBuilder()
        .select('customer')
        .from(Customer, 'customer')
        .where('customer.cpf = :cpf', { cpf: paramCpf })
        .getOne();

      if (searchCpf?.cpf) {
        return searchCpf;
      } else {
        throw new Error(`CPF ${paramCpf} not registered in the base.`);
      }
    } catch (error) {
      if (error instanceof Error) throw new Error(`Error when searching for cpf: ${error.message}`);
      throw new Error(`Error when searching for cpf: ${error}`);
    }
  }
}

export const provideCustomerRepository = new CustomerRepository();
