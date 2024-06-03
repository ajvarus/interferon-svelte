<script>
  import PasswordsTab from "../components/PasswordsTab.svelte";
  import { onMount } from "svelte";
  import { getPasswords } from "../stores/queries/passwordStoreQueries";

  let passwords = [];

  onMount(async () => {
    try {
      passwords = await getPasswords();
      console.log(passwords);
    } catch (error) {
      console.error(error);
    }
  });

  async function onEdit() {
    return;
    // await update_password(updatedPassword);
    // Optionally re-fetch or update local state
  }

  async function onDelete() {
    return;
    // await delete_password(passwordId);
    // Optionally re-fetch or filter out the deleted password locally
  }
</script>

{#if passwords.length > 0}
  <PasswordsTab {passwords} {onEdit} {onDelete} />
{:else}
  <p>Loading...</p>
{/if}
