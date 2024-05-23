import { Customer } from "@/domain/entities/customer";
import * as EmailValidator from 'email-validator';
import { validateCPF } from "validations-br";

export function validationCustomerRequest(body: Customer) {

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

export function validationCpf(cpf: string) {
    const isValid = validateCPF(cpf)
    if (!isValid) {
        return `Invalid CPF number '${cpf}'! Enter a new CPF and try again.`
    }
    return true
}

export function validationEmail(email: string) {
    const isValid = EmailValidator.validate(email)
    if (!isValid)
        return `Invalid email ${email}! Enter a valid email and try again.`
}

export function validateCustomerName(name: string) {

    const customerName = name.toLowerCase()

    const rewrittenCustomerName = customerName
        .replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase())
        .normalize("NFD").replace(/[^a-zA-Z\s]/g, "")
        .replace(/\s{2,}/g, ' ')

    return rewrittenCustomerName
}
