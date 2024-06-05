<script>
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

  const Type = {
    SUCCESS: "success",
    ERROR: "error",
  };

  export let type = "";
  export let title = "";
  export let message = "";
</script>

<div class="card">
  <header
    class="card-header {type === Type.SUCCESS
      ? 'has-background-success'
      : 'has-background-danger'}"
  >
    <p class="card-header-title">{title}</p>
    <button class="card-header-icon" aria-label={type}>
      <FontAwesomeIcon icon={type === Type.SUCCESS ? "check" : "xmark"} />
    </button>
  </header>
  <div class="card-content">
    <div class="content">
      {message}
    </div>
  </div>
</div>
