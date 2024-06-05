<script>
  import { createEventDispatcher } from "svelte";
  import { fade, scale } from "svelte/transition";

  import { FontAwesomeIcon } from "../fontAwesome";

  export let password;

  $: state = password.state;

  const dispatch = createEventDispatcher();

  const State = {
    ADDED: "added",
    DELETED: "deleted",
  };

  const deletePasswordItem = () => {
    dispatch("delete");
  };

  const addPasswordItem = () => {
    dispatch("add");
  };
</script>

<div class="block">
  <div class="field">
    <div class="control is-medium is-rounded">
      <input
        class="input is-medium is-borderless is-shadowless"
        type="text"
        placeholder="Password name|"
        bind:value={password.password_name}
        readonly={state === State.DELETED}
      />
    </div>
  </div>
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
              class="input is-rounded is-expanded"
              type="text"
              placeholder="password"
              bind:value={password.password}
              readonly={state === State.DELETED}
            />
          </div>
          {#if state === State.ADDED}
            <div class="control" in:fade>
              <button
                class="button is-borderless is-rounded"
                on:click={deletePasswordItem}
              >
                <span class="icon is-small has-text-danger">
                  <FontAwesomeIcon icon="trash-can" />
                </span>
              </button>
            </div>
          {:else if state === State.DELETED}
            <div class="control" in:fade>
              <button
                class="button is-borderless is-rounded"
                on:click={addPasswordItem}
              >
                <span class="icon is-small has-text-success">
                  <FontAwesomeIcon icon="plus" />
                </span>
              </button>
            </div>
          {/if}
        </div>
      </div>
    </div>
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
