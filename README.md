# Express Starter
express-starter is a bootstrap project for express with ready-made folder structure, dependency configurations and npm run scripts.

## Installation

You can directly clone this repository:
```bash
git clone https://github.com/heanzyzabala/express-starter.git
```
or you can install the module [create-express-starter](https://www.npmjs.com/package/create-express-starter) available from the npm register.
```bash
npm i -g create-express-starter
```
and setup the project with this command:
```bash
create-express-starter myapp
```
## Usage
The project is ready to run upon cloning, with the default `.env`. Except for the mongodb, you need to have an instance running to run it properly.
```bash
PORT=8080
NODE_ENV=dev
DB_HOST=localhost
DB_PORT=27017
DB_NAME=names
```
These are the available npm scripts:
* `npm run start`
  * Runs the app with node
* `npm run dev`
  * Runs the app with nodemon
* `npm run test`
  * Runs the tests
* `npm run lint`
  * Fix all eslint issues in the project

## Endpoints
The project contains a simple greeting endpoints that you can try out.

* GET /api/greet/:name
##### Request:
```bash
curl localhost:8080/api/greet/heanzy
```
##### Response:
```json
{
    "message": "Hi, heanzy!"
}
```

* POST /api/greet
##### Request:
```bash
curl --location --request POST 'http://localhost:8080/api/greet' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "john"
}'
```
##### Response:
```json
{
    "message": "I'll keep 'john' in mind."
}
```
## File Structure
This is what the project structure look like:
```                
.
├── src
│   ├── models
│   │   └── name.model.js
│   ├── routes
│   │   ├── greet.route.js
│   │   └── index.js
│   ├── schemas
│   │   └── name.schema.js
│   ├── services
│   │   └── name.service.js
│   └── app.js
├── test
│   └── app.test.js
├── .env
├── .env.sample
├── .eslintrc.json
├── .gitignore
├── package-lock.json
├── package.json
└── LICENSE
└── README.md
```
## What's installed:
* [express](https://www.npmjs.com/package/express)
  * Is a minimal and flexible Node.js framework for simple web applications.
* [mongoose](https://www.npmjs.com/package/mongoose)
  * Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment
* [yup](https://www.npmjs.com/package/yup) 
  * Yup is a JavaScript schema builder for value parsing and validation
* [morgan](https://www.npmjs.com/package/morgan)
  * A logging middleware for express, great for tracking http requests.
* [dotenv](https://www.npmjs.com/package/dotenv) 
  * A utility module that loads environment variables from a `.env` file inside your project to a `process.env` variable that you can access inside your code.
* [cors](https://www.npmjs.com/package/cors) 
  * Is a node.js package for providing a middleware that can be used to enable CORS with various options.
* [faker](https://www.npmjs.com/package/faker)
  * A fake data generator for Node.js

### Dev Dependencies:
* [nodemon](https://www.npmjs.com/package/nodemon)
  * Is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
* [eslint](https://www.npmjs.com/package/eslint)
  * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
* [mocha](https://www.npmjs.com/package/mocha)
  * Mocha is a JavaScript test runner that runs both on Node. js and in the browser.
* [chai](https://www.npmjs.com/package/chai)
  * Is a BDD / TDD assertion library for node and the browser that works well with testing frameworks such as Mocha.
* [sinon](https://www.npmjs.com/package/sinon)
  * Is a standalone and test framework agnostic JavaScript test spies, stubs and mocks.
* [supertest](https://www.npmjs.com/package/supertest)
  * Is a library made specifically for testing nodejs http servers.

## Contributing
Pull requests are welcome. Please open an issue first to discuss what you would like to change.


## License
```
MIT License

Copyright (c) 2020 Heanzy Zabala

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
