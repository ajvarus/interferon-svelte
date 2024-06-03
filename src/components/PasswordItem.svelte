<!-- /src/components/PasswordItem.svelte -->

<script>
  import { slide } from "svelte/transition";

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
  let passwordName = password.passwordName;
  let passwordUsername = password.passwordName;
  let passwordValue = password.decryptedPassword;
  let error = null;

  const startEdit = () => {
    state = State.EDITING;
  };

  const startDelete = () => {
    state = State.DELETING;
  };

  const cancelMutation = () => {
    state = State.NEUTRAL;
    error = null;
  };

  const resetToNeutralState = () => {
    setTimeout(() => {
      state = State.NEUTRAL;
      actionType = null;
      error = null;
    }, 1500);
  };

  const confirmMutation = async () => {
    error = null;
    response = null;
    try {
      if (state === State.EDITING) {
        state = State.LOADING;
        response = await onEdit(password.id, passwordValue);
      } else if (state === State.DELETING) {
        state = State.LOADING;
        response = await onDelete(password.id);
      }
      if (not(response)) {
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
  <div class="title">{passwordName}</div>
  <div class="level">
    <div class="level-item">
      <div class="box box-rounded">
        <div class="level">
          <div class="level-item">
            <div class="field is-grouped">
              <div class="control">
                <input
                  class="input is-rounded"
                  type="text"
                  placeholder="username/email"
                  bind:value={passwordUsername}
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
            </div>
            {#if state === State.NEUTRAL}
              <div class="level-item" in:slide out:slide>
                <p class="buttons">
                  <button class="button is-borderless" on:click={startEdit}>
                    <span class="icon is-small">
                      <FontAwesomeIcon icon="pencil" />
                    </span>
                  </button>
                  <button class="button is-borderless" on:click={startDelete}>
                    <span class="icon is-small has-text-danger">
                      <FontAwesomeIcon icon="trash-can" />
                    </span>
                  </button>
                </p>
              </div>
            {/if}
            {#if state === State.EDITING || state === State.DELETING}
              <div class="level-item" in:slide out:slide>
                <p class="buttons">
                  <button
                    class="button is-borderless"
                    on:click={cancelMutation}
                  >
                    <span class="icon is-small has-text-danger">
                      <FontAwesomeIcon icon="xmark" />
                    </span>
                  </button>
                  <button
                    class="button is-borderless"
                    on:click={confirmMutation}
                  >
                    <span class="icon is-small has-text-success">
                      <FontAwesomeIcon icon="check" />
                    </span>
                  </button>
                </p>
              </div>
            {/if}
            {#if state === State.MUTATING}
              <div class="level-item" in:slide out:slide>
                <p class="buttons">
                  <button class="button">
                    <span class="icon is-small">
                      <FontAwesomeIcon icon="spinner" spin />
                    </span>
                  </button>
                </p>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
    {#if state === State.POST_MUTATION}
      <div class="level-item" in:slide out:slide>
        {#if error}
          <span class="icon has-text-danger">
            <FontAwesomeIcon icon="xmark" />
          </span>
        {:else}
          <span class="icon has-text-success">
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

  .button.is-borderless {
    border: none;
    box-shadow: none;
  }
</style>
