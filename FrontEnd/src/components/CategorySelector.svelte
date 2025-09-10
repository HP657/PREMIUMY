<script lang="ts">
    export let categories: string[] = [];
    export let selectedCategory: string;
    export let onSelect: (category: string) => void;
</script>

<div class="flex gap-4 mb-6">
    {#each categories as category}
        <button
                class="px-4 py-2 rounded font-semibold"
                class:selected={selectedCategory === category}
                on:click={() => onSelect(category)}
        >
            {category}
        </button>
    {/each}
</div>

<style>
    button.selected {
        background-color: #2563eb;
        color: white;
    }
</style>
