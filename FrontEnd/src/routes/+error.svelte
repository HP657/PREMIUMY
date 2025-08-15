<script lang="ts">
    import { page } from '$app/state';
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center">
    <h1 class="text-6xl font-bold mb-4 text-white">{page.status}</h1>
    <p class="text-lg mb-8">{page.error?.message || 'Page not found'}</p>
    <a href="/" class="bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition">
        Go Home
    </a>
</div>
