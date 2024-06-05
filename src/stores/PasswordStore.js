import { writable, get } from "svelte/store";

// Create a writable store to hold passwords
export const passwordStore = writable([]);

// Function to update the passwords in the store
export const updatePasswords = (newPasswords) => {
  const isValidPassword = newPasswords.every(
    (password) =>
      "id" in password &&
      "passwordName" in password &&
      "encryptedPassword" in password
  );
  if (!isValidPassword) {
    throw new Error("Invalid password structure");
  }

  const existingPasswords = get(passwordStore);
  const updatedPasswords = [...existingPasswords, ...newPasswords];
  passwordStore.set(updatedPasswords);
  return true;
};
