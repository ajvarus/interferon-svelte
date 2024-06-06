<script>
  import PasswordsTab from "./PasswordsTab.svelte";
  import AddPasswordsTab from "./AddPasswordsTab.svelte";

  import { slide } from "svelte/transition";
  import { cubicIn } from "svelte/easing";

  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

  export let passwords;
  export let result;
  export let onEdit;
  export let onDelete;
  export let addPasswords;

  let addedPasswords;

  const tabs = [
    { name: "passwords", displayName: "Vault", icon: "lock" },
    {
      name: "add-passwords",
      displayName: "Add",
      icon: "plus",
    },
  ];

  let activeTab = tabs[0].name;

  const switchTab = (tab) => {
    activeTab = tab.name;
  };
</script>

<div class="section">
  <div class="tabs is-centered is-medium is-toggle">
    <ul>
      {#each tabs as tab}
        <li class:is-active={activeTab === tab.name}>
          <a on:click={() => switchTab(tab)}>
            <span class="icon">
              <FontAwesomeIcon icon={tab.icon} />
            </span> <span>{tab.displayName}</span></a
          >
        </li>
      {/each}
    </ul>
  </div>

  <div class="tab-content">
    {#if activeTab === "passwords"}
      <PasswordsTab {passwords} {onEdit} {onDelete} />
    {/if}
    {#if activeTab === "add-passwords"}
      <div out:slide={{ easing: cubicIn, duration: 1000, x: 1000 }}>
        <AddPasswordsTab
          on:save={addPasswords}
          {result}
          bind:passwords={addedPasswords}
        />
      </div>
    {/if}
  </div>
</div>
