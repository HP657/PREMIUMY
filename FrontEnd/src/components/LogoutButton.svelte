<script lang="ts">
    import { logout } from '$lib/api';
    import { goto } from '$app/navigation';
    export let setUser: (u: null) => void;

    async function handleLogout() {
        await logout();
        setUser(null);
        goto('/login');
    }
</script>

<button onclick={handleLogout}>로그아웃</button>
