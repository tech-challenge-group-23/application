import { DATABASE, DATABASE_HOST, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } from '@/env';
import { Client } from 'pg';
const client = new Client({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  port: DATABASE_PORT,
});

export async function up() {
  await client.connect();
  await client.query(`CREATE TABLE IF NOT EXISTS product_category
  (
      id smallserial NOT NULL,
      name text NOT NULL,
      PRIMARY KEY (id)
  );`);

  await client.query(`INSERT INTO product_category (name)
  VALUES
    ('lanche'),
    ('acompanhamento'),
    ('bebida'),
    ('sobremesa');`);

  await client.end();
}

export async function down() {
  await client.connect();
  await client.query(`DROP TABLE IF EXISTS "product_category";`);
  await client.end();
}
