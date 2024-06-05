// /src/graphql/passwordMutations.js

import { gql } from "graphql-request";
import getGraphQLClient from "../client";

const STORE_PASSWORDS_MUTATION = gql`
  mutation StorePasswords($passwords: [PasswordInput!]!) {
    storePasswords(passwords: $passwords) {
      id
      passwordName
      encryptedPassword
    }
  }
`;

export async function storePasswordsInBackend(newPasswords) {
  try {
    const client = await getGraphQLClient();
    const response = await client.request(STORE_PASSWORDS_MUTATION, {
      passwords: newPasswords,
    });
    const result = response.storePasswords;
    return result;
  } catch (error) {
    console.log(error);
  }
}
