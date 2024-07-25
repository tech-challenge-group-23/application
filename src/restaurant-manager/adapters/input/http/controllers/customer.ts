import { Customer } from '@/domain/entities/customer';
import { provideCustomerService } from '@/domain/services/customer';
import { CustomerControllerPort } from '@/ports/controllers/customer';
import { CustomerServicePort } from '@/ports/services/customer';
import { Request, Response } from 'express';
import { validateCPF } from 'validations-br';

export class CustomerController implements CustomerControllerPort {
  private customerService: CustomerServicePort;

  constructor() {
    this.customerService = provideCustomerService;
  }

  async createCustomer(req: Request, res: Response): Promise<Response> {
    try {
      const customer = new Customer(
        req.body.name,
        req.body.cpf,
        req.body.email,
      );

      const response = await this.customerService.create(customer);
      if (!response.isValid) {
        return res.status(400).send(
          {
            message: response.message
          }
        );
      }

      return res.status(201).send(response.customer);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async searchCustomerByCpf(req: Request, res: Response): Promise<Response> {
      try {
        if (!validateCPF(req.params.cpf)) {
          return res.status(400).send(
            {
              message: `invalid CPF`
            }
          );
        }

        const response = await this.customerService.searchByCpf(req.params.cpf);
        if (!response.isValid) {
          return res.status(400).send(
            {
              message: response.message
            }
          );
        }

        return res.status(200).send(response.customer);
      } catch (error) {
        return res.status(500).send(error);
      }
    }
}

export const provideCustomerController = new CustomerController();
