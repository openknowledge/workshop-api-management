import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { CustomerSdk, CustomerWrapper } from "../sdk/index.js";

const resolvers = {
  Customer: {
    billingAddress: async (parent: CustomerWrapper) => {
      const customerWrapper: CustomerWrapper = parent;

      const customer = await customerWrapper.get();

      return customer.billingAddress;
    },
  },

  Query: {
    customers: async () => {
      const customerWrappers = CustomerSdk.getAllCustomer();

      return customerWrappers;
    },

    customer: async (_: unknown, args: { number: string }) => {
      return CustomerSdk.getCustomer(args.number);
    },
  },
};

const server = new ApolloServer({
  typeDefs: readFileSync("./src/gql-server/customer.graphql", {
    encoding: "utf-8",
  }),
  resolvers,
});

export const startGraphqlServer = async () => {
  await startStandaloneServer(server, {
    listen: { port: 3333 },
  });
};
