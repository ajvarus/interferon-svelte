<!-- src/App.svelte -->
<script>
  import Router from "svelte-spa-router";
  import routes from "./routes.js";
  // import SignupPage from "./pages/SignupPage.svelte";
</script>

<main>
  <Router {routes} />
</main>

<style>
</style>
