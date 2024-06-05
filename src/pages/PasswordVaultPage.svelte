<script>
  import PasswordVaultTabs from "../components/PasswordVaultTabs.svelte";
  import { onMount, onDestroy } from "svelte";
  import { getPasswords as updatePasswordStore } from "../stores/queries/passwordStoreQueries";
  import { storePasswords } from "../stores/mutations/passwordStoreMutations";
  import { passwordStore as passwordsStore } from "../stores/PasswordStore";

  let passwords = [];
  let isSaved;
  let result;

  let unsubscribe;

  onMount(async () => {
    try {
      const isPasswordStoreSet = await updatePasswordStore();
      console.log(isPasswordStoreSet);
      if (isPasswordStoreSet) {
        unsubscribe = passwordsStore.subscribe((value) => {
          passwords = value;
        });
      } else {
        throw new Error("Password store not set");
      }
    } catch (error) {
      console.error(error);
    }
  });

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
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

  async function addPasswords(event) {
    const savedPasswords = event.detail;
    isSaved = await storePasswords(savedPasswords);
    result = { success: isSaved };
    console.log("Inside PasswordVaultPage", isSaved);
  }
</script>

<PasswordVaultTabs {passwords} {onEdit} {onDelete} {addPasswords} {result} />

<!-- {#if passwords.length > 0}
  <PasswordsTab {passwords} {onEdit} {onDelete} />
{:else}
  <AddPasswordsTab on:save={addPasswords} bind:result />
{/if} -->
