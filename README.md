# My Products API

NodeJS DDD Boilerplate

# Prerequisites

- Node >= 12 , npm
- PostgresQL

# Quick Setup
- "npm i" to install packages
- create myproducts-dev database on postgres
- create myproducts-test database on postgres
- Configure environment variables by creating ".env" file. Copy values from ".env.example" and replace DB configuration for Dev and Test
- "npm run db:migrate:dev" to migrate dev database
- "npm run db:migrate:test" to migrate test database
- "npm start" to run locally via nodemon
- You may check documentation on "http://localhost:3000/api/docs"

# Tests

- "npm run test" to run all tests
- "npm run test:unit" to run unit tests
- "npm run test:features" to run feature tests
- "npm run coverage" to run test coverage

# Features

- **Dependency Injection**
- **Domain Driven Design** code structure inspired by **DDD** and **Clean Architecture**
- **Base Classes** that can be extended for CRUD functionalities in the Infrastructure and Interface Layer
- **Docoumentation** OpenAPi 3.0, swagger-ui-express

# Project Structure
- **config** folder includes all configuration, configuration for future integrations can be included in this folder.
- **logs** folder is where the logs are stored for different environments
- **test** contains the unit and feature tests specs and the support libraries for testing(dataFaker, factories, etc.)
- **src/app** (Application Layer) contains the application use cases
- **src/domain** (Domain Layer) contains business domain classes for identified domain models. Could also contain methods that define business rules to compose use cases
- **src/infra** (Infrastructure Layer) Contains wrapper or interface code that interacts with external services such as database/datastore, logging, 3rd party services, etc. Used in the application layer to compose use cases. Repository pattern is used to interact with database using **sequelize** orm.
- **src/interfaces** (Interface Layer) contains the entry point of the application which is **HTTP** in this case. Controllers, middlewares, the router and the server execution are defined in the http folder in which expressJS is used.
- **src/container.js** This is the main container where all classes/dependencies are registered. Dependency Injection through **Awilix** library is used to resolve the dependency in class and function codes across all layers. This helps in mocking dependencies upon creation of unit tests and resolving dependencies on application pre-start.
- **index.js** this is where the server class is resolved from the container to start the application.

# Linting / Coding Standards
- "npm run lint" to run linting
- airbnb-base
- es6

# Libraries
- Sequelize ORM
- StructureJS for Domain modeling
- Mocha, Chai, supertest for test assertions and api testing
- morgan & winston for logging
- awilix, awilix-express for dependency injection
- multer for file upload middleware
- expressjs web framework
