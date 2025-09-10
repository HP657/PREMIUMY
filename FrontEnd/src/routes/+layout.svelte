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
            <button class="hover:text-gray-300" onclick={() => goto('/resources')}>자료</button>
            <button class="hover:text-gray-300" onclick={() => goto('/payed/resources')}>유료자료</button>
            <button class="hover:text-gray-300" onclick={() => goto('/notice')}>공지사항</button>
            <button class="hover:text-gray-300" onclick={() => goto('/profile')}>내 자료</button>
        </div>


        <div class="space-x-3">
            {#if user}
                <span>{user.userName}님 환영합니다!</span>
                <LogoutButton {setUser} />
            {:else}
                <button class="hover:text-gray-300 font-semibold" onclick={() => goto('/login')}>로그인</button>
            {/if}



        </div>
    </nav>

    <main class="flex-1 pt-20">
        <!--{@render children()}-->
        <slot />
    </main>


    <footer class="bg-black text-white px-8 py-12">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="space-y-2">
                <h2 class="text-xl font-bold">PREMIUMY</h2>
                <p>실전 프로그래밍 문제를 풀어 실력을 향상시키세요.</p>
                <ul class="space-y-1 text-sm">
                    <li>👤 이효준</li>
                    <li>📍 부산광역시 기장군 장안읍 대룡1길 56</li>
                    <li>✉ junlee5070@gmail.com</li>
                    <li>📞 010-4117-0497</li>
                </ul>
            </div>

            <div class="space-y-2">
                <h3 class="font-semibold">약관</h3>
                <ul class="space-y-1 text-sm">
                    <li>이용약관</li>
                    <li>개인정보처리방침</li>
                    <li>자동결제 약관</li>
                </ul>
            </div>
        </div>

        <div class="mt-6 border-t border-gray-700 pt-4 text-sm flex justify-between items-center">
            <p>© 2025 PREMIUMY. All rights reserved.</p>
            <div class="space-x-4 flex">
                <a href="#"><svg class="w-5 h-5">...</svg></a>
                <a href="#"><svg class="w-5 h-5">...</svg></a>
                <a href="#"><svg class="w-5 h-5">...</svg></a>
            </div>
        </div>
    </footer>
</div>
