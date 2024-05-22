// import "reflect-metadata"
import { DataSource } from "typeorm";
import { DATABASE, DATABASE_HOST, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } from '@/env';
import { Customer } from "@/domain/entities/customer"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE,
    entities: [Customer],
    synchronize: true,
    logging: false
    // subscribers: [],
    // migrations: [],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((error) => console.log(error))
