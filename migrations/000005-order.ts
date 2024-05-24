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
  await client.query(
    `CREATE TYPE order_status AS ENUM ('recebido', 'em preparação', 'pronto', 'finalizado');
    `,
  );
  await client.query(`CREATE TABLE IF NOT EXISTS "orders"
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
  );`);

  await client.query(`ALTER TABLE IF EXISTS "orders"
    ADD FOREIGN KEY (customer_id)
    REFERENCES customers (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;`);

  await client.end();
}

export async function down() {
  await client.connect();
  await client.query(`DROP TABLE IF EXISTS "orders";`);
  await client.query(`DO
  $$
  BEGIN
    IF EXISTS (SELECT * FROM pg_type typ WHERE typ.typname = 'order_status') THEN
      DROP TYPE "order_status" CASCADE;
    END IF;
  END;
  $$
  LANGUAGE plpgsql;`);
  await client.end();
}
