## Workshop API Management

This repository contains samples for the workshop API Testing.

# Running the samples of the workshop

The samples run with Docker Compose.
So please ensure you have docker installed in a recent version.

Start the examples by typing

```
docker compose up --build
```

from within the folder you cloned the repository.

# Demo

This demo showcases a few ways to use an API as consumer.

The consumer is a TypeScript-based Node.js application. You need a recent Node.js (say version 19) and NPM.

Go to directory `./client`.

Install all dependencies with `npm install`.

In a different terminal run `npm run watch` build compile the TypeScript code to JavaScript.

Open the file `./client/src/index.ts`.

To try the consumer, run `node lib/index.js`.

Use `console.log(value)` to output requests (or any other data) to the terminal.

There are three different showcases:

- codegen (function `runCodegenClient`)
  - Generate an API client using the OpenAPI generator by running `npm run codegen`
  - Make sure to look corresponding script in `package.json`. It shows how we invoke the generator.
  - Follow the TODOs in `index.ts` and make a few requets using the `CustomerApi` class.
- SDK (function `runSdkClient`)
  - In `./client/src/sdk` lives a hand-maded SDK that talks to the customer API
  - Make sure to take a look on how it is implemented and how it differs from the generated API client
  - Follow the TODOs in `index.ts` and make a few requests using the `CustomerApi` object.
- GraphQL (function `runGraphQLClient`)
  - In `./client/src/gql-server` lives a small GraphQL server that provides an alternate API to the Customer API
  - In `./client/src/gql-client` lives function to make simple GraphQL queries
  - Add `await startGraphqlServer();` to start the GraphQL server
  - Visit `http://localhost:3333` to see the GraphQL Web UI
  - Play around with the UI and try a few GraphQL queries
  - Follow the TODOs in `index.ts` and make a GraphQL query
  - NOTE: Press Ctrl-C to stop the consumer.
