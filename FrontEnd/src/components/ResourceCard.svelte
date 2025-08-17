<script lang="ts">
    export let title: string;
    export let date: string;
    export let views: number;
</script>

<div class="w-full border-2 rounded-lg p-4 bg-gray-800 text-white flex justify-between items-center">
    <div>
        <p class="text-lg font-semibold">{title}</p>
        <h4 class="text-sm text-gray-400">{date}</h4>
    </div>
    {#if views !== undefined}
        <p class="text-sm text-yellow-400">조회수: {views}</p>
    {/if}
</div>
