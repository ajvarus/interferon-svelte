<script>
  import PasswordItem from "./PasswordItem.svelte";
  import PasswordsLoading from "./PasswordsLoading.svelte";

  export let passwords = [];
  export let onEdit;
  export let onDelete;
</script>

<div class="section">
  <div class="fixed-grid has-6-cols">
    <div class="grid">
      <div class="cell"></div>
      <div class="cell is-col-span-4">
        {#if passwords.length === 0}
          <PasswordsLoading />
        {:else}
          {#each passwords as password (password.id)}
            <PasswordItem {password} {onEdit} {onDelete} />
          {/each}
        {/if}
      </div>
      <div class="cell"></div>
    </div>
  </div>
</div>
<div></div>
