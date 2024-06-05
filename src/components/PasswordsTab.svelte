<script>
  import PasswordItem from "./PasswordItem.svelte";

  export let passwords = [];
  export let onEdit;
  export let onDelete;
</script>

<div class="section">
  <div class="fixed-grid has-5-cols">
    <div class="grid">
      <div class="cell"></div>
      <div class="cell is-col-span-3">
        {#each passwords as password (password.id)}
          <PasswordItem {password} {onEdit} {onDelete} />
        {/each}
      </div>
      <div class="cell"></div>
    </div>
  </div>
</div>
<div></div>
