import { connection } from '@/adapters/output/postgres/connection';
import { Pool } from 'pg';

export class migrations {
    private pool: Pool;

    constructor() {
        // Initialize PostgreSQL connection pool
        this.pool = connection
    }

    async up() {
        try {
            const client = await this.pool.connect();
            const query = `BEGIN;
            CREATE TYPE order_status AS ENUM ('recebido', 'em preparação', 'pronto', 'finalizado');
            
            CREATE TABLE IF NOT EXISTS customer
            (
                id bigserial NOT NULL,
                name text NOT NULL,
                cpf varchar(11) NOT NULL,
                email text NOT NULL,
                created_at timestamp with time zone NOT NULL DEFAULT now(),
                PRIMARY KEY (id)
            );
            
            CREATE TABLE IF NOT EXISTS products
            (
                id bigserial NOT NULL,
                category_id smallint NOT NULL,
                name text NOT NULL,
                description text,
                price numeric NOT NULL,
                image bytea,
                created_at timestamp with time zone NOT NULL DEFAULT now(),
                updated_at timestamp with time zone NOT NULL DEFAULT now(),
                PRIMARY KEY (id)
            );
            
            CREATE TABLE IF NOT EXISTS product_category
            (
                id smallserial NOT NULL,
                name text NOT NULL,
                PRIMARY KEY (id)
            );
            
            CREATE TABLE IF NOT EXISTS "order"
            (
                id bigserial NOT NULL,
                customer_id bigint,
                command smallint NOT NULL,
                order_status order_status NOT NULL,
                total_price numeric NOT NULL,
                items jsonb NOT NULL,
                order_updated_at jsonb NOT NULL,
                created_at timestamp with time zone DEFAULT now(),
                PRIMARY KEY (id)
            );
            
            ALTER TABLE IF EXISTS products
                ADD FOREIGN KEY (category_id)
                REFERENCES product_category (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
                NOT VALID;
            
            
            ALTER TABLE IF EXISTS "order"
                ADD FOREIGN KEY (customer_id)
                REFERENCES customer (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
                NOT VALID;
            
            INSERT INTO product_category (name) 
            VALUES 
              ('lanche'),
              ('acompanhamento'),
              ('bebida'),
              ('sobremesa');
            
            END;`

            const result = await client.query(query);
            client.release(); 

            return result;
        } catch (error: any) {
            throw new Error(`Error saving product: ${error.message}`);
        }
    }
}

const newMigrations = new migrations

newMigrations.up()