// src/graphql/client.js

import { GraphQLClient } from "graphql-request";
import { INTF_GRAPHQL_ENDPOINT } from "../config";
import { getToken } from "../stores/queries/tokenStoreQueries";

export default async function getGraphQLClient() {
  const token = getToken();
  console.log(token);
  return new GraphQLClient(INTF_GRAPHQL_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
