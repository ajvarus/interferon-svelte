<!-- /src/components/PasswordItem.svelte -->

<script>
  import { slide, fade, scale } from "svelte/transition";

  import { FontAwesomeIcon } from "../fontAwesome";

  export let password;
  export let onEdit;
  export let onDelete;

  const State = {
    NEUTRAL: "neutral",
    EDITING: "editing",
    DELETING: "deleting",
    MUTATING: "mutating",
    POST_MUTATION: "postMutation",
  };

  let state = State.NEUTRAL;
  let originalPassword = { ...password }; // Preserve original password;
  let passwordName = password.passwordName;
  let passwordUsername = "";
  let passwordValue = password.decryptedPassword;
  let error = null;

  $: {
    if (state === State.EDITING) {
      password.passwordName = passwordName;
      password.decryptedPassword = passwordValue;
    }
  }

  const startEdit = () => {
    state = State.EDITING;
  };

  const startDelete = () => {
    state = State.DELETING;
  };

  const cancelMutation = () => {
    state = State.NEUTRAL;
    password = { ...originalPassword }; // Restore originalPassword;
    passwordName = password.passwordName;
    passwordValue = password.decryptedPassword;
    error = null;
  };

  const resetToNeutralState = () => {
    setTimeout(() => {
      state = State.NEUTRAL;
      error = null;
    }, 5000);
  };

  const confirmMutation = async () => {
    let error = null;
    let response = null;
    try {
      if (state === State.EDITING) {
        state = State.MUTATING;
        response = await onEdit(password);
      } else if (state === State.DELETING) {
        state = State.MUTATING;
        response = await onDelete(password);
      }
      if (!response) {
        error = "Action failed";
      }
      state = State.POST_MUTATION;
      resetToNeutralState();
    } catch (err) {
      error = "Action failed";
      state = State.POST_MUTATION;
      resetToNeutralState();
    }
  };
</script>

<div class="block">
  <div class="level">
    <div class="level-item">
      <div class="field is-grouped is-grouped-multiline">
        <div class="control is-medium is-rounded">
          <input
            class="input is-medium is-borderless is-shadowless pr-3"
            type="text"
            placeholder="Password name|"
            bind:value={passwordName}
            readonly={state !== State.EDITING}
          />
        </div>
      </div>
      <div class="level-item">
        <div class="box box-rounded has-text-centered">
          <div class="level">
            <div class="level-item">
              <div class="field is-grouped is-grouped-multiline">
                <div class="control is-expanded">
                  <input
                    class="input is-rounded"
                    type="text"
                    placeholder="username/email"
                    readonly
                  />
                </div>
                <div class="control">
                  <input
                    class="input is-rounded"
                    type="text"
                    placeholder="password"
                    bind:value={passwordValue}
                    readonly={state !== State.EDITING}
                  />
                </div>
                {#if state === State.NEUTRAL}
                  <div class="control">
                    <button
                      class="button is-borderless is-rounded"
                      on:click={startEdit}
                      in:fade
                    >
                      <span class="icon is-small has-text-grey">
                        <FontAwesomeIcon icon="pencil" />
                      </span>
                    </button>
                  </div>
                  <div class="control">
                    <button
                      class="button is-borderless is-rounded"
                      on:click={startDelete}
                      in:fade={{ delay: 150 }}
                    >
                      <span class="icon is-small has-text-danger">
                        <FontAwesomeIcon icon="trash-can" />
                      </span>
                    </button>
                  </div>
                {/if}
                <!-- {#if state === State.EDITING || state === State.DELETING || state === State.MUTATING} -->
                {#if state !== State.NEUTRAL}
                  <div class="control">
                    <button
                      class="button is-borderless is-rounded"
                      on:click={cancelMutation}
                      in:fade
                      disabled={state === State.MUTATING ||
                        state === State.POST_MUTATION}
                    >
                      <span class="icon is-small has-text-danger">
                        <FontAwesomeIcon icon="xmark" />
                      </span>
                    </button>
                  </div>
                  <div class="control">
                    <button
                      class="button is-borderless is-rounded"
                      on:click={confirmMutation}
                      in:fade={{ delay: 150 }}
                      disabled={state === State.MUTATING ||
                        state === State.POST_MUTATION}
                    >
                      <span class="icon is-small has-text-success">
                        <FontAwesomeIcon icon="check" />
                      </span>
                    </button>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {#if state === State.MUTATING}
      <div class="level-item" in:slide>
        <span class="icon has-text-grey">
          <FontAwesomeIcon icon="spinner" spin />
        </span>
      </div>
    {/if}
    {#if state === State.POST_MUTATION}
      <div class="level-item" in:fade={{ delay: 100 }} out:fade>
        {#if error}
          <span class="icon has-background-danger box-rounded">
            <FontAwesomeIcon icon="xmark" />
          </span>
        {:else}
          <span class="icon has-background-success box-rounded">
            <FontAwesomeIcon icon="check" />
          </span>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .box-rounded {
    border-radius: 1.5rem;
  }

  .is-borderless {
    border: none;
    border-color: transparent;
  }

  .button.is-borderless {
    border: none;
    box-shadow: none;
  }
</style>
