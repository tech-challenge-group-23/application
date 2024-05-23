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
  await client.query(`CREATE TABLE IF NOT EXISTS customer
    (
        id bigserial NOT NULL,
        name text NOT NULL,
        cpf varchar(11) NOT NULL,
        email text NOT NULL,
        created_at timestamp with time zone NOT NULL DEFAULT now(),
        PRIMARY KEY (id)
    );`);

  await client.end();
}

export async function down() {
  await client.connect();
  await client.query(`DROP TABLE IF EXISTS "customer";`);
  await client.end();
}
