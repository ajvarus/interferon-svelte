// /src/stores/mutations/passwordStoreMutations.js

import {
  storePasswordsInBackend,
  updatePasswordsInBackend,
  deletePasswordsInBackend,
} from "../../graphql/mutations/passwordMutations";
import { updatePasswordsInStore, OpType } from "../PasswordStore";

import {
  transformPasswordsForStorage,
  transformPasswordsForUpdate,
  transformPasswordsForDeletion,
} from "../../tools/passwordTransformer";

export async function storePasswords(newPasswords) {
  let isStored = false;
  let storedPasswords = [];
  let transformedPasswords = [];
  if (newPasswords.length !== 0) {
    transformedPasswords = transformPasswordsForStorage(newPasswords);
    storedPasswords = await storePasswordsInBackend(transformedPasswords);
    isStored = updatePasswordsInStore(storedPasswords, OpType.ADD);
  }
  return isStored;
}

export async function updatePasswords(passwords) {
  let isUpdated = false;
  if (passwords) {
    let transformedPasswords = transformPasswordsForUpdate(passwords);
    let updatedPasswords = await updatePasswordsInBackend(transformedPasswords);
    isUpdated = updatePasswordsInStore(updatedPasswords, OpType.MODIFY);
  }
  return isUpdated;
}

export async function deletePasswords(passwords) {
  let isDeleted = false;
  if (passwords) {
    let transformedPasswords = transformPasswordsForDeletion(passwords);
    let deletedPasswords = await deletePasswordsInBackend(transformedPasswords);
    isDeleted = updatePasswordsInStore(deletedPasswords, OpType.DELETE);
  }
  return isDeleted;
}
