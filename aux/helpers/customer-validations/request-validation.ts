import { Customer } from "@/domain/entities/customer-entity";
import * as EmailValidator from 'email-validator';
import { validateCPF } from "validations-br";

// var validator = require("email-validator");

export function validationRequest(body: Customer) {

    if(!body.name) {
        return `Campo nome é obrigatório! Insira um nome e tente novamente`
    }

    if(!body.cpf) {
        return `Campo CPF é obrigatório! Insira um CPF válido e tente novamente.`
    } else {
        const isValid = validateCPF(body.cpf)
        if(isValid ==! true) {
            return `Número de CPF inválido! Insira um novo CPF e tente novamente.`
        }
    }

    if(!body.email) {
        return `Campo email é obrigatório! Tente novamente.`
    } else {
        const teste = EmailValidator.validate(body.email)
        if(teste ==! true)
            return `Email inválido! Insira um email válido e tente novamente.`
    }

    return true
}




