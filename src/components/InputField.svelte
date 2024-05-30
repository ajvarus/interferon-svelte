<!-- src/components/InputField.svelte -->
<script>
  export let type = "text";
  export let placeholder = "";
  export let valid = true;
  export let value = "";
  export let onInput;

  const handleInput = (event) => {
    value = event.target.value;
    if (onInput) onInput(event);
  };
</script>

<div class="field">
  <div class="control">
    {#if type === "text"}
      <input
        class="input {valid ? '' : 'is-danger'}"
        type="text"
        {placeholder}
        bind:value
        on:input={handleInput}
      />
    {:else if type === "email"}
      <input
        class="input {valid ? '' : 'is-danger'}"
        type="email"
        {placeholder}
        bind:value
        on:input={handleInput}
      />
    {:else if type === "password"}
      <input
        class="input {valid ? '' : 'is-danger'}"
        type="password"
        {placeholder}
        bind:value
        on:input={handleInput}
      />
    {/if}
  </div>
</div>

<style>
</style>
