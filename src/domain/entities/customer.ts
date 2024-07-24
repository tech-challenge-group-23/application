import { validateCPF } from "validations-br";
import * as EmailValidator from 'email-validator';

export class Customer {
   id?: number;
   name: string;
   cpf: string;
   email: string;
   created_at?: Date;

  constructor(name: string, cpf: string, email: string, created_at?: Date, id?: number) {
    this.id = id
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.created_at = created_at;
  }

  validateCustomer(body: Customer) {
    if (!body.name) {
        return `Name field is mandatory! Enter a name and try again.`
    }

    if (!body.cpf) {
        return `CPF field is mandatory! Enter a valid CPF and try again.`
    } else {
        const isValid = validateCPF(body.cpf)
        if (!isValid) {
            return `Invalid CPF number '${body.cpf}'! Enter a new CPF and try again.`
        }
    }

    if (!body.email) {
        return `Email field is mandatory! Enter an email and try again.`
    } else {
        const isValid = EmailValidator.validate(body.email)
        if (!isValid)
            return `Invalid email '${body.email}'! Enter a valid email and try again.`
    }

    return true
}

  async validationEmail(email: string) {
      const isValid = EmailValidator.validate(email)
      if (!isValid)
          return `Invalid email ${email}! Enter a valid email and try again.`
  }

  async rewrittenCustomerName() {
      const customerName = this.name.toLowerCase()

      return customerName
      .replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase())
      .normalize("NFD").replace(/[^a-zA-Z\s]/g, "")
      .replace(/\s{2,}/g, ' ')

  }
}

export class CustomerServiceResponse {
  isValid?: boolean;
  message?: string;
  customer?: Customer;
}
