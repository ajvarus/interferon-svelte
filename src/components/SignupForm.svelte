<!-- src/components/SignupForm.svelte -->

<script>
  import { createEventDispatcher } from "svelte";

  import { fade } from "svelte/transition";
  //import { authStore } from "../stores/authStore.js"; // Import the auth store
  import InputField from "./InputField.svelte"; // Import the InputField component
  import { FontAwesomeIcon } from "../fontAwesome";

  // Local state for the form inputs
  let username = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let emailValid = true;
  let isLoading = false;
  let authSuccess = false;
  let authFailed = false;

  // Create a dispatcher to send custom events
  const dispatch = createEventDispatcher();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleInputChange = () => {
    emailValid = validateEmail(email);
  };

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Changed to signin to test signin
    const payload = { auth_type: "resolve", username, email, password };
    isLoading = true;
    dispatch("submit", { payload });
  };

  export let result; // This will receive the result from the parent component

  $: if (result !== undefined) {
    isLoading = false;
    authSuccess = result.success;
    authFailed = !result.success;

    if (result.success) {
      setTimeout(() => (authSuccess = false), 1500);
    } else {
      setTimeout(() => (authFailed = false), 1500);
    }
  }
</script>

<div class="box">
  <h1 class="title">Signin</h1>
  <h2 class="subtitle is-6 has-text-centered">
    We'll sign you up if you're new or sign you in if you aren't. Yes, the
    seamlessness starts here.
  </h2>
  <form on:submit|preventDefault={handleSubmit}>
    <!-- Use the InputField component for each input field -->
    <InputField type="text" placeholder="Username" bind:value={username} />
    <InputField
      type="email"
      placeholder="Email"
      bind:value={email}
      valid={emailValid}
      on:input={handleInputChange}
    />
    <InputField type="password" placeholder="Password" bind:value={password} />
    <InputField
      type="password"
      placeholder="Confirm Password"
      bind:value={confirmPassword}
    />
    <button
      class="button is-rounded {!authFailed
        ? 'is-primary'
        : 'is-danger'} {isLoading ? 'is-loading' : ''}"
      type="submit"
    >
      {#if authSuccess}
        <span class="icon"><FontAwesomeIcon icon="check" /></span>
      {:else if authFailed}
        <span class="icon"><FontAwesomeIcon icon="xmark" /></span>
      {:else}
        <span class="icon" in:fade><FontAwesomeIcon icon="arrow-right" /></span>
      {/if}
    </button>
  </form>
</div>

<style>
  /* Custom styles if needed */
</style>
