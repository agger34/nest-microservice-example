<p align="center">
  <img src="./Event sourcing CQRS saga.png" width="auto" alt="Logo" />
</p>
<p align="center">A Node.js Swagger API Microservice example</p>

## Description
This is an app that demonstrates how to use Nest.js to create a RESTful API microservice

## Patterns
* Event-sourcing
* CQRS
* Saga
* ...

## Installation
```bash
$ npm
```

## Running the app
```bash
# development
$ npm install
$ npm run start
```

## Relateds Links
Swagger Explorer URL: http://localhost:3000/api

## Simple functions
### Orders Application
- Create/Cancel/Read an order
- Auto deliver orders after X secords
### Payments Application
- pub/sub events by Order App

# TBC
* write Event store and restore Read storage
* Handling concurrent updates using optimistic locking
* Using snapshots to improve performance
* ...
