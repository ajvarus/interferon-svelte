// src/graphql/passwordQueries.js

import { gql } from "graphql-request";
import getGraphQLClient from "../client";

// GraphQL query to fetch passwords
const GET_PASSWORDS_QUERY = gql`
  query GetPasswords {
    getPasswords {
      id
      passwordName
      decryptedPassword
    }
  }
`;

export async function getPasswordsFromBackend() {
  try {
    const client = await getGraphQLClient();
    const response = await client.request(GET_PASSWORDS_QUERY);
    const result = response.getPasswords;
    return result;
  } catch (error) {
    console.log(error);
  }
}
