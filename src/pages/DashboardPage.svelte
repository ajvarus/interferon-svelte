<script>
  import DashboardMenu from "../components/DashboardMenu.svelte";
  import PasswordVaultPage from "./PasswordVaultPage.svelte";

  import { logout } from "../apis/auth/auth";
  import { userStore } from "../stores/userStore";
  import { clearToken } from "../stores/queries/tokenStoreQueries";
  import { clearUserStore } from "../stores/userStore";
  import { clearPasswordStore } from "../stores/PasswordStore";

  import { push } from "svelte-spa-router";

  let currentPage = "vault";

  async function manageLogout() {
    userStore.update((store) => ({ ...store, isLoggingOut: true }));
    let isLoggedOut = false;
    try {
      isLoggedOut = await logout();
      if (isLoggedOut) {
        clearToken();
        clearUserStore();
        clearPasswordStore();
        setTimeout(() => push("/"), 500);
      }
    } catch (error) {
      console.log(error);
    } finally {
      userStore.update((store) => ({ ...store, isLoggingOut: false }));
    }
  }
</script>

<DashboardMenu bind:currentPage {manageLogout} />
{#if currentPage === "vault"}
  <PasswordVaultPage />
{/if}
