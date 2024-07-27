import { DATABASE, DATABASE_HOST, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } from 'env';
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
  await client.query(`CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE
);
`);

  await client.end();
}

export async function down() {
  await client.connect();
  await client.query(`DROP TABLE IF EXISTS "customers" CASCADE;`);
  await client.end();
}
