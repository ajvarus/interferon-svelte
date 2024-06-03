<script>
  import PasswordItem from "./PasswordItem.svelte";

  export let passwords = [];
  export let onEdit;
  export let onDelete;
</script>

<div class="section">
  <div class="fixed-grid has-4-cols">
    <div class="grid">
      <div class="cellis-col-span-2">
        {#each passwords as password (password.id)}
          <PasswordItem {password} {onEdit} {onDelete} />
        {/each}
      </div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
    </div>
  </div>
</div>
<div></div>
