import { makeGraphQLQuery } from "./gql-client/index.js";
import { startGraphqlServer } from "./gql-server/index.js";
import { gql } from "@urql/core";
import { CustomerApi } from "./sdk/index.js";

// using codegen

// TODO: create customer API object
// TODO: configure correct base path

// const start = async () => {
// TODO: List all customers
// TODO: Get a single customer
// TODO: Create a customer
// TODO: Get newly create customer
// TODO: Set billing address for new customer
// TODO: Get customer again
// };

// using sdk

// const start = async () => {
// TODO: List all customers
// TODO: Create a customer
// TODO: Set billing address on customer
// };

// using graphql

// const start = async () => {
// TODO: Start graphql server
// await startGraphqlServer();
// TODO: Create a query to find all customers
// TODO: Also query the billing address
// };

start();
