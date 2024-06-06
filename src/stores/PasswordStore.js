import { writable, get } from "svelte/store";

// Create a writable store to hold passwords
export const passwordStore = writable([]);

export const OpType = {
  ADD: "add",
  MODIFY: "modify",
  DELETE: "delete",
};

// Function to update the passwords in the store
export const updatePasswordsInStore = (passwords, opType) => {
  let isUpdated = false;
  if (!isStorable(passwords)) {
    throw new Error("Invalid password structure");
  }
  switch (opType) {
    case OpType.ADD:
      isUpdated = addPasswordsToStore(passwords);
      break;
    case OpType.MODIFY:
      isUpdated = modifyPasswordsInStore(passwords);
      break;
    case OpType.DELETE:
      // TODO
      break;
    default:
      throw new Error("Invalid operation type");
  }
  return isUpdated;
};

function addPasswordsToStore(newPasswords) {
  const existingPasswords = get(passwordStore);
  const updatedPasswords = [...existingPasswords, ...newPasswords];
  passwordStore.set(updatedPasswords);
  return true;
}

function modifyPasswordsInStore(modifiedPasswords) {
  const existingPasswords = get(passwordStore);
  const updatedPasswords = existingPasswords.map((password) => {
    const modifiedPassword = modifiedPasswords.find(
      (modPassword) => modPassword.id === password.id
    );
    return modifiedPassword ? { ...password, ...modifiedPassword } : password;
  });
  passwordStore.set(updatedPasswords);
  return true;
}

function isStorable(passwords) {
  let isValid = true;
  const isValidPassword = passwords.every(
    (password) =>
      "id" in password &&
      "passwordName" in password &&
      "encryptedPassword" in password
  );
  if (!isValidPassword) {
    isValid = false;
  }
  return isValid;
}
