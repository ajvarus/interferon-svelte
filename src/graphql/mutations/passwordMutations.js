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

const UPDATE_PASSWORDS_MUTATION = gql`
  mutation UpdatePasswords($passwords: [PasswordUpdateInput!]!) {
    updatePasswords(passwords: $passwords) {
      id
      passwordName
      encryptedPassword
    }
  }
`;

export async function updatePasswordsInBackend(modifiedPasswords) {
  try {
    const client = await getGraphQLClient();
    const response = await client.request(UPDATE_PASSWORDS_MUTATION, {
      passwords: modifiedPasswords,
    });
    const result = response.updatePasswords;
    return result;
  } catch (error) {
    console.log(error);
  }
}
