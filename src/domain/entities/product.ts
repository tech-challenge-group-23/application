import { Entity, Column, PrimaryGeneratedColumn, } from "typeorm"

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    categoryId: number;

    @Column()
    name: string;

    @Column()
    description?: string

    @Column()
    price: number

    @Column()
    image?: Buffer

    @Column()
    createdAt?: string

    @Column()
    updatedAt?: string

    constructor(categoryId: number, name: string, description: string, price: number, image: Buffer) {
        this.categoryId = categoryId;
        this.name = name;
        this.description = description
        this.price = price
        this.image = image
    }
}

export type ProductServiceResponse = {
    created?: boolean
    isValid?: boolean
    wasFound?: boolean
    products?: Product[]
    message?: string
    errorMessage?: string
};
