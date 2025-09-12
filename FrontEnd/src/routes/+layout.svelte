<script lang="ts">
    import "../app.css";
    import { goto } from '$app/navigation';
    import type { User } from '$lib/types/user';
    import LogoutButton from "../components/LogoutButton.svelte";

    export let data: { user: User | null };

    let user = data.user;

    function setUser(u: null) {
        user = u;
    }
</script>


<div class="min-h-screen flex flex-col">
    <nav class="fixed top-0 left-0 w-full z-50 bg-black text-white px-8 py-4 flex justify-between items-center shadow">
        <button
                class="flex items-center font-bold text-xl bg-transparent border-0 cursor-pointer select-none"
                onclick={() => goto('/')}
        >
            PREMIUMY
        </button>

        <div class="space-x-6 font-semibold">
            <button class="cursor-pointer hover:text-gray-300" onclick={() => goto('/resources')}>자료</button>
            <button class="cursor-pointer hover:text-gray-300" onclick={() => goto('/payed/resources')}>유료자료</button>
            <button class="cursor-pointer hover:text-gray-300" onclick={() => goto('/notice')}>공지사항</button>
            <button class="cursor-pointer hover:text-gray-300" onclick={() => goto('/profile')}>내 자료</button>
        </div>


        <div class="space-x-3">
            {#if user}
                <span>{user.userName}님 환영합니다!</span>
                <LogoutButton {setUser} />
            {:else}
                <button class="cursor-pointer hover:text-gray-300 font-semibold" onclick={() => goto('/login')}>로그인</button>
            {/if}



        </div>
    </nav>

    <main class="flex-1 pt-20">
        <!--{@render children()}-->
        <slot />
    </main>

    <footer class="mt-6 mb-5 border-t border-gray-700 pt-4 text-sm">
        <p class="ml-3">© 2025 PREMIUMY. All rights reserved.</p>
    </footer>
</div>
