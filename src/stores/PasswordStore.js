import { writable } from "svelte/store";

// Create a writable store to hold passwords
export const passwordStore = writable([]);

// Function to update the passwords in the store
export const updatePasswords = (newPasswords) => {
  passwordStore.set(newPasswords);
};
