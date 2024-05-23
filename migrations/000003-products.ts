import { DATABASE, DATABASE_HOST, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } from '@/env';
import { Client } from 'pg';
const client = new Client({
  database: DATABASE,
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  port: DATABASE_PORT,
});

export async function up() {
  await client.connect();
  await client.query(`CREATE TABLE IF NOT EXISTS products
    (
        id bigserial NOT NULL,
        category_id smallint NOT NULL,
        name text NOT NULL,
        description text,
        price numeric NOT NULL,
        image bytea,
        created_at timestamp with time zone NOT NULL DEFAULT now(),
        updated_at timestamp with time zone NOT NULL DEFAULT now(),
        PRIMARY KEY (id),
        CONSTRAINT name_unique UNIQUE (name)
    );`);

  await client.query(`ALTER TABLE IF EXISTS products
    ADD FOREIGN KEY (category_id)
    REFERENCES product_category (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;`);

  await client.end();
}

export async function down() {
  await client.connect();
  await client.query(`DROP TABLE IF EXISTS "products";`);
  await client.end();
}
