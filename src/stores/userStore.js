// src/stores/userStore.js

import { writable } from "svelte/store";

export const userStore = writable({
  isAuthenticated: false,
  username: "",
});
