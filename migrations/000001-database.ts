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
  await client.query(`CREATE DATABASE "${DATABASE}";`);
  await client.end();
}

export async function down() {
  await client.connect();
  await client.query(`DROP DATABASE IF EXISTS "${DATABASE}";`);
  await client.end();
}
