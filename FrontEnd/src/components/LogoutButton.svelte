<script lang="ts">
    import { goto } from "$app/navigation";
    import api from "$lib/api";


    async function logout() {
    try {
        await api.post('/auth/logout');
        goto('/login');
    } catch (error) {
        alert('Logout failed. Please try again.');
    }
    }

</script>

<button on:click={logout}>Logout</button>
