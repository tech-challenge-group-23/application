import { Entity, Column, PrimaryGeneratedColumn,   } from "typeorm"

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column({
        length: 11
    })
    cpf: string;

    @Column("text")
    email: string;

    @Column("timestamp with time zone")
    createdAt?: Date

    constructor(name: string, cpf: string, email: string) {
        // this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        // this.createdAt = createdAt

        if(!name)
            `Campo nome é obrigatório`

        if(!cpf)
            `Campo CPF é obrigatório`

        if(!email)
            `Campo email é obrigatório`

        
    }

}

// export default class Customer {
//     id?: number;
//     name: string;
//     cpf: string;
//     email: string;
//     // created_at: Date;

//     constructor(id: number, name: string, cpf: string, email: string) {
//         this.id = id;
//         this.name = name;
//         this.cpf = cpf;
//         this.email = email;
//         // this.created_at = new Date();
//     }
// }

// export type Customer = {
//     id?: number;
//     name: string;
//     cpf: string;
//     email: string;
//     createdAt?: string
// }