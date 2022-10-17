# Ramba Contact API

Backend REST API on Node.js + Express.js + Typescript + MongoDB.

# Account API
This API allow users to create account,login, create, manage and search their contacts.

# Features
- Basic Authentication (Register, Logout & Login)
- Create Account
- Add Contact
- Edit Contact
- View Contacts
- Search Contacts
- Delete Contact


# API Documentation
https://documenter.getpostman.com/view/13581274/2s847EQZFV

## Quick Start to run locally

## Clone Repo

## Run npm install

## Create .env file

    Create .env file in project folder
    Enter these lines:

        NODE_ENV = 'production'
        JWT_SECRET =
        DB_STRING_DEV =
        DB_STRING_PROD =
        DB_STRING_TEST =

## Start App
    npm start for production
    npm run dev - development
    npm run test - test

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--test\           # Test
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--helpers\        # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.ts          # Express app
```

## Validation

Request data is validated using [Joi](https://joi.dev/).
The validation schemas are defined in the `/validations` directory and are used in the routes by providing them as parameters to the `validate` middleware.

## Running Tests

```
npm run test
```
Test is powered by Mocha testing library.

**Note:** Make sure you set up the test variables in the `.env` file