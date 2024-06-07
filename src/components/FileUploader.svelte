<!--- /src/components/FileUploader.svelte --->

<script>
  import { parsePasswordsFromFile } from "../tools/passwordFileParser.js";
  import { createEventDispatcher } from "svelte";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

  const dispatch = createEventDispatcher();

  const State = {
    NEUTRAL: "neutral",
    PARSING: "parsing",
    POST_PARSING: "postParsing",
  };

  let state = State.NEUTRAL;
  let passwords = [];
  let error = false;

  const resetToNeutralState = () => {
    setTimeout(() => {
      state = State.NEUTRAL;
      error = false;
    }, 2000);
  };

  function handleFileChange(event) {
    state = State.PARSING;

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        passwords = parsePasswordsFromFile(fileContent);
        if (passwords.length === 0) {
          error = true;
        }
        dispatch("fileParsed", { passwords });
      };
      reader.readAsText(file);
    }
    state = State.POST_PARSING;
    resetToNeutralState();
  }
</script>

<div class="file is-primary is-rounded">
  <label class="file-label">
    <input
      class="file-input"
      type="file"
      accept=".txt"
      name="passwords"
      on:change={handleFileChange}
    />
    <span class="file-cta">
      <span class="file-icon">
        {#if state === State.NEUTRAL}
          <FontAwesomeIcon icon="upload" />
        {:else if state === State.PARSING}
          <FontAwesomeIcon icon="spinner" spin />
        {:else if state === State.POST_PARSING}
          {#if error}
            <FontAwesomeIcon icon="xmark" />
          {:else}
            <FontAwesomeIcon icon="check" />
          {/if}
        {/if}
      </span>
      <span class="file-label"> .txt </span>
    </span>
  </label>
</div>
