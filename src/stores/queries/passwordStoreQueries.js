// src/stores/queries.js

import { getPasswordsFromBackend } from "../../graphql/queries/passwordQueries";
import { passwordStore } from "../PasswordStore";

export async function getPasswords() {
  let passwords;
  passwordStore.subscribe((value) => {
    passwords = value;
  })();

  if (passwords.length === 0) {
    passwords = await getPasswordsFromBackend();
    passwordStore.set(passwords);
  }

  return passwords;
}
