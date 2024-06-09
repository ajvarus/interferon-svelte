// src/stores/userStore.js

import { writable } from "svelte/store";

export const userStore = writable({
  isAuthenticated: false,
  username: "",
  isLoggingOut: false,
});

export function clearUserStore() {
  userStore.set({
    isAuthenticated: false,
    isNew: true,
    username: "",
    isLoggingOut: false,
  });
}
