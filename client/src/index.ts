import { startGraphqlServer } from "./gql-server/index.js";

// Codegen Showcase
const runCodegenClient = (async () => {
  // TODO: Create customer API object
  // TODO: Configure to correct base path http://localhost:4000
  // TODO: List all customers
  // TODO: Get a single customer
  // TODO: Create a customer
  // TODO: Get newly create customer
  // TODO: Set billing address for new customer
  // TODO: Get customer again
})();

// SDK Showcase
const runSdkClient = (async () => {
  // NOTE: Use the CustomerSdk object
  // TODO: List all customers
  // TODO: Get a single customer
  // TODO: Create a customer
  // TODO: Set billing address on customer
})();

// GraphQL Showcase
const runGraphQLClient = (async () => {
  // NOTE: Don't remove this line, but uncomment when doing this showcase.
  // await startGraphqlServer();
  // TODO: Create a query to find all customers
  // TODO: Also query the billing address
  // TODO: Add a few other fields to your query
  // TODO: Create a query to find a single customer
})();
