// src/routes.js

import SignupPage from "./pages/SignupPage.svelte";
import PasswordVaultPage from "./pages/PasswordVaultPage.svelte";
import DashboardPage from "./pages/DashboardPage.svelte";
import NotFoundPage from "./pages/NotFoundPage.svelte";

const routes = {
  "/": SignupPage,
  "/vault": PasswordVaultPage,
  "/dashboard": DashboardPage,
  "*": NotFoundPage,
};

export default routes;
