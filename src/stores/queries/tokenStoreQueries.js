// src/stores/tokenStoreQueries.js

import { get } from "svelte/store";
import { tokenStore } from "../tokenStore";

// Function to initialize the token store from localStorage
export function initializeToken() {
  const token = localStorage.getItem("token");
  if (token) {
    tokenStore.set(token);
  }
}

// Function to set the token both in the store and localStorage
export function setToken(token) {
  localStorage.setItem("token", token);
  tokenStore.set(token);
}

// Function to clear the token from the store and localStorage
export function clearToken() {
  localStorage.removeItem("token");
  tokenStore.set(null);
}

export function getToken() {
  let token = get(tokenStore);
  if (!token) {
    token = localStorage.getItem("token");
    if (token) {
      tokenStore.set(token);
    }
  }
  return token;
}
