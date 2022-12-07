import { createClient } from "@urql/core";

const client = createClient({
  url: "http://localhost:3333/graphql",
});

export const makeGraphQLQuery = async <T = any>(query: any) => {
  const awaitable = await client.query(query, {}).toPromise();

  const result = await awaitable;

  return result.data as T;
};
