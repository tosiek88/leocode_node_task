<p align="center">
# Leocode Node Task
</p>

## Description

Core of application are tree endpoints 
- `/api/sign-in` - Allow user to retrive a Bearer Token, necessary to future authorization.
Application currently has two users. Additionally Basic Roles policy have been implemented, One user is ADMIN, another just an User.

- `/api/generate-key-pair` - Allow authorized user to generate Private Encrypted RSA-2048 and Public Key, both are returned as a json object with appropriate field names. Generated keys are stored together with User data in Mocked Database

- `/api/encrypt` - Allow authorized user to encrypt filre requested from  <a href="http://www.africau.edu/images/default/sample.pdf" target="_blank">sample.pdf page</a>

File `leocode-node-task/src/request.http` contain useful examples of REST Request.
I am using <a href="https://github.com/pashky/restclient.el" target="_blank">https://github.com/pashky/restclient.el</a>
to make make request against API.

<p>Application is divided on modules which encapsulated their responsibilities, Very Basic implementation off Domain Driven Desing is used, Flow of data is from Controller through the Servies to Repository. Between component's DTO's are used to transfer only reqired data.</p> 
    
<p>All Modules use Dependency Injections, and built in IoC allowing to decouple components between each other, simplifies writing a test. </p>

<p>Main core of Authentication module is Passport and JWT, Local Strategy, JWT token will expire after 5 minutes.</p>

<p>    Additionally in ```/src/users/users.controller.ts``` there is couple of examples that allow to test functionality of Role, RoleGuards. AuthGuards are elegant way to manage all authentication logic, if all conditions are meet it will attach user object to request object, which can be access in controller. </p>

<p> In memory database contain two users:

```ts 
    {
      id: 1,
      email: 'admin@mail.com',
      password: '$2b$10$NVZuUn6qxpPtmHkLDHxQzetkKgT4Oopi87KOQJcZFFrOm0LdYtWae', //encrypted and salted password 1234
      role: 'ADMIN',
      token: '',
      keyPair: { privateKey: MockPrivateKey, publicKey: MockPublicKey },
    },
    {
      id: 2,
      email: 'user@mail.com',
      password: '$2b$10$bZojqhcDXWZIcfmRD6d9S.mG3hr5oxpM25BTXg35fXJX422NBhnn.', //encrypted and salted password 4321
      role: 'USER',
      token: '',
      keyPair: { privateKey: '', publicKey: '' },
    },

` 
</p>

<p>    Built-in Node CryptoJs is responsible for encryption and decryption. With modulusLength  set to 2048 buffer of data need to be divided for segments and encrypted partially. On the end all parts are merged and encoded with base64 schema. Decryption is working exacly same but with oposite direction. Public key is used for encryption, and is taken from stored User object (from mocked Database), only authorized user can get a key. </p>
    
E2e written in JestJs

Example of use: 
![Demo Animation](./assets/example.gif?raw=true)

## Installation

```bash
$ npm install
```

## Running the app

Change name of `.env.tpl` to `.env`

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Test

```bash
# e2e tests
$ npm run test:e2e
```

## Stay in touch

- Author - [Tocha Mateusz]

