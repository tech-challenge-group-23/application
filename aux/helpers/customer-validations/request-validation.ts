import { Customer } from "@/domain/entities/customer-entity";
import * as EmailValidator from 'email-validator';

// var validator = require("email-validator");

export function validationRequest(body: Customer) {

    if(!body.name) {
        return `Campo nome é obrigatório!`
    }

    if(!body.cpf) {
        return `Campo CPF é obrigatório!`
    }

    if(!body.email) {
        return `Campo email é obrigatório!`
    }

    const teste = EmailValidator.validate(body.email)
    if(teste ==! true){
        return `Email inválido`
    }

    return true
}




