export class Customer {
    id?: number;
    name: string;
    cpf: string;
    email: string;
    createdAt?: string;

    constructor(name: string, cpf: string, email: string) {
        // this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        // this.createdAt = createdAt
    }
}