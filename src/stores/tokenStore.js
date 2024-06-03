// src/stores/tokenStore.js

import { writable } from "svelte/store";

// Create a writable store for the token
export const tokenStore = writable(null);
