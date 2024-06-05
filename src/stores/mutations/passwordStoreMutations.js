// /src/stores/mutations/passwordStoreMutations.js

import { storePasswordsInBackend } from "../../graphql/mutations/passwordMutations";
import { updatePasswords } from "../PasswordStore";

import transformPasswordsForStorage from "../../tools/passwordTransformer";

export async function storePasswords(newPasswords) {
  let isStored = false;
  let storedPasswords = [];
  let transformedPasswords = [];
  if (newPasswords.length !== 0) {
    transformedPasswords = transformPasswordsForStorage(newPasswords);
    storedPasswords = await storePasswordsInBackend(transformedPasswords);
    isStored = updatePasswords(storedPasswords);
  }
  return isStored;
}
