<script lang="ts">
    import { goto } from '$app/navigation';
    import { checkAuth, getUserProfile } from '$lib/api';
  import { onMount } from 'svelte';
    import LogoutButton from '../components/LogoutButton.svelte';

  let user = null;
  let isAuthenticated = false;

  onMount(async () => {
    user = await getUserProfile();
    console.log(user)
    isAuthenticated = await checkAuth();
  });
</script>

{#if isAuthenticated}
  <h1>Welcome! ✅</h1>
  <LogoutButton />
{:else}
  <h1>Please log in 🔒</h1>
  <button on:click={() => goto('/login')}>Go to Login</button>
{/if}
