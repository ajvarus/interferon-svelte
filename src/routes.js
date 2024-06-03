// src/routes.js

import SignupPage from "./pages/SignupPage.svelte";
import PasswordVaultPage from "./pages/PasswordVaultPage.svelte";
import NotFoundPage from "./pages/NotFoundPage.svelte";

const routes = {
  "/": SignupPage,
  "/vault": PasswordVaultPage,
  "*": NotFoundPage,
};

export default routes;
