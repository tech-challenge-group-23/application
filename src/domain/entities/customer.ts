export default class Customer {
    id?: number;
    name: string;
    cpf: string;
    email: string;
    // created_at: Date;

    constructor(id: number, name: string, cpf: string, email: string) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        // this.created_at = new Date();
    }
}
