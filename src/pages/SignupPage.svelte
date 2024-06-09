<!-- src/pages/SignupPage.svelte -->

<script>
  import SignupForm from "../components/SignupForm.svelte";
  import { userStore } from "../stores/userStore.js";
  import { setToken } from "../stores/queries/tokenStoreQueries.js";
  import { push } from "svelte-spa-router";

  import { INTF_AUTH_ENDPOINT } from "../config";

  let result; // Auth state used my signform component.

  const handleSignup = async (event) => {
    const { payload } = event.detail;

    try {
      const response = await fetch(INTF_AUTH_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const session = await response.json();

      result = { success: session.is_active };
      if (session.is_active) {
        setToken(session.token);
        userStore.set({
          isAuthenticated: true,
          username: payload.username,
          isNew: session.intf_user.is_new,
        });
        setTimeout(() => push("/dashboard"), 1500);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      result = { success: false };
    }
  };
</script>

<section class="hero is-fullheight">
  <div class="hero-body has-text-centered">
    <div class="container">
      <div class="fixed-grid has-4-cols">
        <div class="grid">
          <div class="cell"></div>
          <div class="cell is-col-span-2">
            <SignupForm on:submit={handleSignup} bind:result />
          </div>
          <div class="cell"></div>
          <div class="cell"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
</style>
