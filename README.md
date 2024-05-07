# tech-challenge-fiap-group-23

this is the project of the fiap tech challenge


# getting started

1. make sure you're using node version 20+. if you don't, we recommend you install it from nvm where you can follow installation guide here: https://github.com/nvm-sh/nvm


2. install pnpm on your machine

```bash
npm i -g pnpm
```

3. create in the project root a file named .env.dev and add ALL VARIABLES needed to the project

example

```bash
APP_PORT = 8080
```

3. install the project dependencies

```bash
pnpm install
```
4. if is your first time running the project, run the following command

```bash
pnpm run migrate:up
```

this command creates the database and run all database scripts as create table and CRUD operations

4. to run the project, run the following command

```bash
pnpm dev
```

if everything goes well you will see in the terminal the log running on port: xxxx

# how to build a production version

1. make sure you're in the project root, and run the following command

```bash
pnpm build
```

# good to know

for best practice the commits message is written using convertional commits especification that can be found here https://www.conventionalcommits.org/en/v1.0.0/
