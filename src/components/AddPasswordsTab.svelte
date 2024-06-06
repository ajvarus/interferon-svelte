<!-- src/components/AddPasswordsTab.svelte -->
<script>
  import AddPasswordItem from "./AddPasswordItem.svelte";
  import { createEventDispatcher } from "svelte";
  import { fade, scale } from "svelte/transition";

  import PasswordsLoading from "./PasswordsLoading.svelte";
  import MessageBox from "./MessageBox.svelte";

  import { FontAwesomeIcon } from "../fontAwesome";

  const dispatch = createEventDispatcher();

  const State = {
    ADDED: "added",
    DELETED: "deleted",
  };

  const SelfState = {
    NEUTRAL: "neutral",
    SAVING: "saving",
    SUCCESS: "success",
    ERROR: "error",
  };

  let selfState = SelfState.NEUTRAL;

  export let passwords = [];
  let plen = 0;
  $: plen = passwords.length;
  $: hasDeletedPasswords = passwords.some(
    (password) => password.state === State.DELETED
  );
  $: hasAddedPasswords = passwords.some(
    (password) => password.state === State.ADDED
  );

  const addPassword = () => {
    passwords = [
      ...passwords,
      { id: Date.now(), password_name: "", password: "", state: State.ADDED },
    ];
  };

  const deletePassword = (id) => {
    passwords = passwords.map((password) =>
      password.id === id ? { ...password, state: State.DELETED } : password
    );
  };

  const addDeletedPassword = (id) => {
    passwords = passwords.map((password) =>
      password.id === id ? { ...password, state: State.ADDED } : password
    );
  };

  const savePasswords = () => {
    const savedPasswords = passwords.filter(
      (password) => password.state === State.ADDED
    );
    selfState = SelfState.SAVING;
    console.log("Saving passwords", selfState);
    dispatch("save", savedPasswords);
  };

  export let result;

  $: if (result !== undefined) {
    console.log("Inside AddPasswordsTab", result.success);
    if (result.success) {
      selfState = SelfState.SUCCESS;
      setTimeout(() => {
        passwords = [];
        selfState = SelfState.NEUTRAL;
      }, 5000);
    } else {
      selfState = SelfState.ERROR;
      setTimeout(() => {
        selfState = SelfState.NEUTRAL;
      }, 5000);
    }
  }
</script>

<div class="section">
  <div class="fixed-grid has-7-cols">
    <div class="grid">
      <div class="cell is-col-span-2"></div>
      <div class="cell is-col-span-3">
        <div class="block">
          <p class="buttons is-centered">
            <button
              class="button has-text-success is-large is-rounded"
              on:click={addPassword}><FontAwesomeIcon icon="plus" /></button
            >
            {#if plen > 0 && hasAddedPasswords}
              <button
                class="button is-success is-large is-rounded"
                on:click={savePasswords}
                ><FontAwesomeIcon icon="check" /></button
              >
            {/if}
          </p>
          {#if selfState === SelfState.SAVING}
            <PasswordsLoading />
          {/if}
          {#if selfState === SelfState.ERROR}
            <div in:fade out:scale>
              <MessageBox
                type={selfState}
                title="Error"
                message="Passwords could not be saved. Please try again."
              />
            </div>
          {/if}
          {#if selfState === SelfState.SUCCESS}
            <div in:fade out:scale>
              <MessageBox
                type={selfState}
                title="Success"
                message="Passwords were saved successfully. To view your passwords, please visit the Passwords tab."
              />
            </div>
          {/if}
          {#if selfState === SelfState.NEUTRAL}
            {#each passwords as password (password.id)}
              {#if password.state === State.ADDED}
                <div class="block" in:fade={{ duration: 150 }}>
                  <AddPasswordItem
                    {password}
                    on:delete={() => deletePassword(password.id)}
                  />
                </div>
              {/if}
            {/each}
            {#if hasDeletedPasswords}
              <div class="block">
                <progress
                  class="progress is-small is-light"
                  value="100"
                  max="100"
                ></progress>
                <h4 class="subtitle is-4">Deleted</h4>
                {#each passwords as password (password.id)}
                  {#if password.state === State.DELETED}
                    <AddPasswordItem
                      {password}
                      on:add={() => addDeletedPassword(password.id)}
                    />
                  {/if}
                {/each}
              </div>
            {/if}
          {/if}
        </div>
      </div>
      <div class="cell is-col-span-2"></div>
    </div>
  </div>
</div>
