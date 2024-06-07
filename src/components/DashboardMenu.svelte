<!-- /src/components/DashboardMenu.svelte -->

<script>
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { slide, fly } from "svelte/transition";

  let showLabel = false;

  export let currentPage = "vault";

  function navigateTo(page) {
    currentPage = page;
  }
</script>

<div
  class="section is-pulled-left px-5"
  on:mouseenter={() => (showLabel = true)}
  on:mouseleave={() => (showLabel = false)}
>
  <aside class="menu pr-1">
    <p class="menu-label title"></p>
    <ul class="menu-list">
      <div class="block">
        <li>
          <div
            class="level"
            on:mouseenter={() => (showLabel = true)}
            on:mouseleave={() => (showLabel = false)}
          >
            <div class="level-item">
              <a
                class="button is-rounded"
                class:is-active={currentPage === "vault"}
                on:click={() => navigateTo("vault")}
              >
                <span class="icon is-large has-text-grey">
                  <FontAwesomeIcon icon="lock" />
                </span>
              </a>
            </div>
            <div class="level-item">
              {#if showLabel}
                <span
                  transition:fly={{ x: -50, duration: 200 }}
                  class="is-static">Vault</span
                >
              {/if}
            </div>
          </div>
        </li>
      </div>
    </ul>
    <div class="spacer"></div>
    <p class="menu-label title"></p>
    <ul class="menu-list">
      <div class="block">
        <li>
          <div
            class="level"
            on:mouseenter={() => (showLabel = true)}
            on:mouseleave={() => (showLabel = false)}
          >
            <div class="level-item">
              <a class="button is-rounded">
                <span class="icon is-large has-text-grey">
                  <FontAwesomeIcon icon="power-off" />
                </span>
              </a>
            </div>
            <div class="level-item">
              {#if showLabel}
                <span
                  transition:fly={{ x: -50, duration: 200 }}
                  class="is-static">Logout</span
                >
              {/if}
            </div>
          </div>
        </li>
      </div>
    </ul>
  </aside>
</div>

<!-- .level-item span.is-static {
  display: block;
  white-space: nowrap;
} -->

<style>
  .section {
    display: flex;
    flex-direction: column;
    height: 100vh; /* Full viewport height */
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Right edge shadow */
  }

  .menu {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .spacer {
    flex-grow: 1; /* Takes up all available space */
  }
</style>
