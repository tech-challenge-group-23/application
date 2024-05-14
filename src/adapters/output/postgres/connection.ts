import { Pool } from "pg";
import { DATABASE, DATABASE_HOST, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } from '@/env';

export const connection = new Pool({
    user: DATABASE_USER,
    host: DATABASE_HOST,
    database: DATABASE,
    password: DATABASE_PASSWORD,
    port: DATABASE_PORT 
});