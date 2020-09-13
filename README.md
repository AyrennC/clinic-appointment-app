# Clinic - Code Test

A React Native application for managing clinic appointments, powered by Express.js.

## Quickstart

### Backend Services

Navigate to `/docker` directory and execute:

1. Install server dependencies under docker environment
    ```shell script
   docker-compose run api yarn install
    ```
   
2. Edit the `JWT_SECRET` entry under `.env`, a random string should be provided
    ```shell script
   echo JWT_SECRET=your-super-secret-string > .env
    ```
   
3. Start the backend services, the server will be served at port `80`.
    ```shell script
   docker-compose up
    ```
   
   
### Frontend Client

Navigate to `/app` directory and execute:

1. Install dependencies under docker environment
    ```shell script
    yarn add
    ```
   
2. Edit the `API_URL` entry under `.env`, it should be set to your local ip-address
    ```shell script
   echo API_URL=http://127.0.0.1 > .env
    ```
   
3. Start the application
    ```shell script
   yarn start
    ```
   
# Server language, and libraries

**Typescript** is used with conjunction of **InversifyJS**, this allows an Inversion of Control pattern to be deployed through decorator.

This enables greater decoupling between different components and domains.

Due to the absence of heavy data-flow or transformation, and most of the backend functionalities are implemented with native modules. No unit test has been implemented. 

## Language Requirements

The codebase can be transpile to ES6 Javascript with `tsc` if using Native NodeJS is a essential requirement.
   
# API Endpoints

## Clinic Management

This section contains the set of endpoints for managing a clinic profile

### Clinic Registration

> To register a clinic entry, use this snippet:

```shell
curl 'https://"$BASE_URL"/api/auth/signup' \
  -X POST \
  -H "Content-Type: application/json" \
  -d @request.json
```

> In request.json:

```json
{
  "name": "The Clinic",
  "email": "clinic@example.com",
  "password": "987654321",
  "phone": "98765432",
  "address": "Address Line 1, Hong Kong"
}
```

> The above command returns JSON structured like this:

```json
{
  "clinic": {
    "id": 90,
    "name": "The Clinic",
    "email": "clinic@example.com",
    "phone": "98765432",
    "address": "Address Line 1, Hong Kong",
    "createdAt": "2020-09-12T23:59:55.925Z",
    "updatedAt": "2020-09-12T23:59:55.926Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5c..."
}
```

This endpoint creates a clinic profile in the database

#### HTTP Request

`POST /api/auth/signup`

#### Request Body

Parameter | Type | Description
--------- | ---- | -----------
name | string | **Required**.
email | string | **Required**.
password | string | **Required**. Must have 8 or more characters.
phone | string | **Required**. Must be 8 digit numeric string. 
address | text | **Required**.

#### Response Body

Parameter | Type | Description
--------- | ---- | -----------
clinic | Clinic | Clinic entity
token | string | Access token

### Password Sign In

> To sign in with email and password, use this snippet:

```shell
curl 'https://"$BASE_URL"/api/auth/signin' \
  -X POST \
  -H "Content-Type: application/json" \
  -d @request.json
```

> In request.json:

```json
{
  "email": "clinic@example.com",
  "password": "987654321"
}
```

> The above command returns JSON structured like this:

```json
{
  "clinic": {
    "id": 90,
    "name": "The Clinic",
    "email": "clinic@example.com",
    "phone": "98765432",
    "address": "Address Line 1, Hong Kong",
    "createdAt": "2020-09-12T23:59:55.925Z",
    "updatedAt": "2020-09-12T23:59:55.926Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5c..."
}
```

This endpoint grants access token for password login

#### HTTP Request

`POST /api/auth/signin`

#### Request Body

Parameter | Type | Description
--------- | ---- | -----------
email | string | **Required**.
password | string | **Required**.

#### Response Body

Parameter | Type | Description
--------- | ---- | -----------
clinic | Clinic | Clinic entity
token | string | Access token

### Clinic Info

> To create a folder entry, use this snippet:

```shell
curl 'https://"$BASE_URL"/api/auth/signin' \
  -X GET \
  -H "Authorization: Bearer  eyJhbGciOiJIUzI1NiIsInR5c..."
```

> The above command returns JSON structured like this:

```json
{
  "clinic": {
    "id": 90,
    "name": "The Clinic",
    "email": "clinic@example.com",
    "phone": "98765432",
    "address": "Address Line 1, Hong Kong",
    "createdAt": "2020-09-12T23:59:55.925Z",
    "updatedAt": "2020-09-12T23:59:55.926Z"
  }
}
```

This endpoint retrieve the authenticated user's clinic profile

#### HTTP Request

`GET /api/auth/me`

#### Response Body

Parameter | Type | Description
--------- | ---- | -----------
clinic | Clinic | Clinic entity


## Consultation Administration

This section requires an authenticated user token, for editing consultation records

### Consultation Creation

> To create a consultation entry, use this snippet:

```shell
curl 'https://"$BASE_URL"/api/consultation/create' \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer  eyJhbGciOiJIUzI1NiIsInR5c..." \
  -d @request.json
```

> In request.json:

```json
{
  "patient": "Lily Imane",
  "doctor": "Dr. Snyder",
  "diagnosis": "Lorem ipsum dolor sit amet, consectetur...",
  "medication": "Four dose of...",
  "fee": 1020.5,
  "date": "2020-09-13T12:15:00.000Z"
}
```

> The above command returns JSON structured like this:

```json
{
  "consultation": {
    "id": 200,
    "doctor": "Dr. Snyder",
    "patient": "Lily Imane",
    "diagnosis": "Lorem ipsum dolor sit amet, consectetur...",
    "medication": "Four dose of...",
    "fee": 1020.5,
    "date": "2020-09-13T12:15:00.000Z",
    "createdAt": "2020-09-12T23:59:55.925Z",
    "updatedAt": "2020-09-12T23:59:55.926Z"
  }
}
```

This endpoint creates a consultation record in the database

#### HTTP Request

`POST /api/consultation/create`

#### Request Body

Parameter | Type | Description
--------- | ---- | -----------
patient | string | **Required**.
doctor | string | **Required**.
diagnosis | text | **Required**.
medication | text | **Required**.
fee | number | **Required**.
date | Date | **Required**.

#### Response Body

Parameter | Type | Description
--------- | ---- | -----------
consultation | Consultation | Consultation entity

### Attach Follow-up Consultation 

> To attach a follow-up consultation, use this snippet:

```shell
curl 'https://"$BASE_URL"/api/consultation/attach/:id' \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer  eyJhbGciOiJIUzI1NiIsInR5c..." \
  -d @request.json
```

> In request.json:

```json
{
  "followUpId": 201
}
```

> The above command returns JSON structured like this:

```json
{
  "consultation": {
    "id": 200,
    "doctor": "Dr. Snyder",
    "patient": "Lily Imane",
    "diagnosis": "Lorem ipsum dolor sit amet, consectetur...",
    "medication": "Four dose of...",
    "fee": 1020.5,
    "date": "2020-09-13T12:15:00.000Z",
    "createdAt": "2020-09-12T23:59:55.925Z",
    "updatedAt": "2020-09-12T23:59:55.926Z",
    "followUp": {
      "id": 201,
      "doctor": "Dr. Malena",
      "patient": "Lily Imane",
      "diagnosis": "Maecenas quis mauris neque. Sed luctus...",
      "medication": "One dose of...",
      "fee": 800.5,
      "date": "2020-09-15T13:30:00.000Z",
      "createdAt": "2020-09-13T12:15:00.000Z",
      "updatedAt": "2020-09-13T12:15:00.000Z"
    }
  }
}
```

This endpoint attach a consultation as a follow-up to another consultation

#### HTTP Request

`POST /api/consultation/attach/:id`

#### Request Parameters

Parameter | Type | Description
--------- | ---- | -----------
id | string | **Required**. ID of the parent consultation

#### Request Body

Parameter | Type | Description
--------- | ---- | -----------
followUpId | string | **Required**. ID of the follow-up consultation

#### Response Body

Parameter | Type | Description
--------- | ---- | -----------
consultation | Consultation | Consultation entity

### List the authenticated user's consultation records

> To query a list of consultations, use this snippet:

```shell
curl 'https://"$BASE_URL"/api/consultation/list' \
  -X GET \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer  eyJhbGciOiJIUzI1NiIsInR5c..."
```

> The above command returns JSON structured like this:

```json
{
  "consultations": [
    {
      "id": 200,
      "doctor": "Dr. Snyder",
      "patient": "Lily Imane",
      "diagnosis": "Lorem ipsum dolor sit amet, consectetur...",
      "medication": "Four dose of...",
      "fee": 1020.5,
      "date": "2020-09-13T12:15:00.000Z",
      "createdAt": "2020-09-12T23:59:55.925Z",
      "updatedAt": "2020-09-12T23:59:55.926Z",
      "followUp": {
        "id": 201,
        "doctor": "Dr. Malena",
        "patient": "Lily Imane",
        "diagnosis": "Maecenas quis mauris neque. Sed luctus...",
        "medication": "One dose of...",
        "fee": 800.5,
        "date": "2020-09-15T13:30:00.000Z",
        "createdAt": "2020-09-13T12:15:00.000Z",
        "updatedAt": "2020-09-13T12:15:00.000Z"
      }
    },
    {
      "id": 201,
      "doctor": "Dr. Malena",
      "patient": "Lily Imane",
      "diagnosis": "Maecenas quis mauris neque. Sed luctus...",
      "medication": "One dose of...",
      "fee": 800.5,
      "date": "2020-09-15T13:30:00.000Z",
      "createdAt": "2020-09-13T12:15:00.000Z",
      "updatedAt": "2020-09-13T12:15:00.000Z"
    }
  ]
}
```

This endpoint query a list of consultations made by the user

#### HTTP Request

`GET /api/consultation/list`

#### Response Body

Parameter | Type | Description
--------- | ---- | -----------
consultations | Consultation[] | Consultation entities
