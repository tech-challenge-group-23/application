# tech-challenge-fiap-group-23

This is an academic project developed for the postgraduate course in Software Architecture. It consists of a monolithic for managing customers, products, and orders for a small "lanchonete/ hamburgueria" ("snack bar").
This solution uses Node.Js with typescript and PostgreSQL for storage.

## Architecture
This project utilizes hexagonal architecture to isolate the application's models, domains, and business rules from the input and output interfaces and their specificities.


## Primary Operations
- Customer: Create and query a customer (by ID or CPF)
- Order: Create, edit status, and query orders (by ID, order status, or customer ID)
- Product: Create, edit, delete, and query products (by category ID)

## Tecnical Decisions
This delivery can be seen as an MVP where issues of scale, concurrency, and other critical scenarios have been disregarded. It is a simple implementation aimed at serving a small business, with only one instance of the application.

The order queue is controlled by the front-end, which should request the list of orders by status (received, in preparation, ready, and completed) and send a request to change the status as it progresses in the real world.

## Getting Started

### Docker
1. Run this command in root directory to build and run the app:
   
```bash
docker-compose up
```

2. The aplication will be running on port: `8080`

3. To access swagger and test the endpoint, use the route `/api-docs` (http://localhost:8080/api-docs) 

4. Run this command in root directory to stops and removes the container:
   
```bash
docker-compose down
```


### Local
1. make sure you're using node version 20+. if you don't, we recommend you install it from nvm where you can follow installation guide here: https://github.com/nvm-sh/nvm


2. Create a file named `.env.docker-dev` in root directory with the follow content:

```bash
APP_PORT=8080
DATABASE_HOST=postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=admin123
DATABASE_PORT=5432
DATABASE=tech_challenge
```
  
3 install pnpm on your machine

```bash
npm i -g pnpm
```

4. install the project dependencies

```bash
pnpm install
```

5. if is your first time running the project, run the following command

```bash
pnpm run migrate:up
```

this command creates the database and run all database scripts as create table and CRUD operations

6. run the project
  a.  Develop enviroment:

```bash
pnpm dev
```

  b.  Production enviroment:

```bash
pnpm build
```

if everything goes well you will see in the terminal the log running on port: `8080`

7. To access swagger and test the endpoint, use the route `/api-docs` (http://localhost:8080/api-docs) 

