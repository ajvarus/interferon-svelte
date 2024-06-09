<script>
  import PasswordItem from "./PasswordItem.svelte";
  import PasswordsLoading from "./PasswordsLoading.svelte";

  import { passwordsState } from "../stores/PasswordStore";

  export let passwords = [];
  export let onEdit;
  export let onDelete;

  $: isLoading = $passwordsState.isLoading;
</script>

<div class="section">
  <div class="fixed-grid has-6-cols">
    <div class="grid">
      <div class="cell"></div>
      <div class="cell is-col-span-4">
        {#if isLoading}
          <PasswordsLoading />
        {:else if passwords.length > 0}
          {#each passwords as password (password.id)}
            <PasswordItem {password} {onEdit} {onDelete} />
          {/each}
        {:else}
          <section class="has-text-centered">
            <p>Nothing to see here yet.</p>
            <p>Start by adding some passwords.</p>
          </section>
        {/if}
      </div>
      <div class="cell"></div>
    </div>
  </div>
</div>
<div></div>
