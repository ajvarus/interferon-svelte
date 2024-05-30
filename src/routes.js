// src/routes.js

import SignupPage from "./pages/SignupPage.svelte";
import NotFoundPage from "./pages/NotFoundPage.svelte";

const routes = {
  "/": SignupPage,
  "*": NotFoundPage,
};

export default routes;
