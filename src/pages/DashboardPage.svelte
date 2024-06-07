<script>
  import DashboardMenu from "../components/DashboardMenu.svelte";
  import PasswordVaultPage from "./PasswordVaultPage.svelte";
  import { fly } from "svelte/transition";

  let currentPage = "vault";
</script>

<DashboardMenu bind:currentPage />
{#if currentPage === "vault"}
  <PasswordVaultPage />
{/if}
