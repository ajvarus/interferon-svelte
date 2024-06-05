// src/stores/queries.js

import { getPasswordsFromBackend } from "../../graphql/queries/passwordQueries";
import { passwordStore } from "../PasswordStore";
import { get } from "svelte/store";

export async function getPasswords() {
  let isPasswordStoreSet = false;
  let passwords = [];
  passwords = get(passwordStore);

  if (passwords.length === 0) {
    passwords = await getPasswordsFromBackend();
    passwordStore.set(passwords);
    isPasswordStoreSet = true;
  }
  return isPasswordStoreSet;
}
