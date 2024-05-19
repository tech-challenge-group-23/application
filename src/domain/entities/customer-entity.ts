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
    created_at?: Date

    constructor(name: string, cpf: string, email: string) {
        // this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        // this.createdAt = createdAt
    }

}
