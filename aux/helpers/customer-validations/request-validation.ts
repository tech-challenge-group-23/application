import { Customer } from "@/domain/entities/customer-entity";
import * as EmailValidator from 'email-validator';
import { validateCPF } from "validations-br";

export function validationRequest(body: Customer) {

    if (!body.name) {
        return `Campo nome é obrigatório! Insira um nome e tente novamente`
    }

    if (!body.cpf) {
        return `Campo CPF é obrigatório! Insira um CPF válido e tente novamente.`
    } else {
        // validationCpf(body.cpf) 
        const isValid = validateCPF(body.cpf)
        if (isValid !== true) {
            return `Número de CPF '${body.cpf}' inválido! Insira um novo CPF e tente novamente.`
        }
    }

    if (!body.email) {
        return `Campo email é obrigatório! Tente novamente.`
    } else {
        // validationEmail(body.email)
        const isValid = EmailValidator.validate(body.email)
        if (isValid !== true)
            return `Email '${body.email}' inválido! Insira um email válido e tente novamente.`
    }

    return true
}

export function validationCpf(cpf: string) {
    const isValid = validateCPF(cpf)
    if (isValid !== true) {
        return `Número de CPF '${cpf}' inválido! Insira um novo CPF e tente novamente.`
    }
    return true
}

export function validationEmail(email: string) {
    const isValid = EmailValidator.validate(email)
    if (isValid !== true)
        return `Email ${email} inválido! Insira um email válido e tente novamente.`
}

export function validateCustomerName(name: string) {

    const customerName = name.toLowerCase()

    const rewrittenCustomerName = customerName
        .replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase())
        .normalize("NFD").replace(/[^a-zA-Z\s]/g, "")
        .replace(/\s{2,}/g, ' ')

    return rewrittenCustomerName
}


