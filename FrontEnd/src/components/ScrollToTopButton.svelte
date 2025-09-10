<script lang="ts">
    import { onMount } from "svelte";
    let showButton = false;

    // 스크롤 감지
    const handleScroll = () => {
        showButton = window.scrollY > 300; // 300px 이상 스크롤 시 버튼 표시
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    onMount(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });
</script>

{#if showButton}
    <button
            on:click={scrollToTop}
            class="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-black text-white shadow-lg hover:bg-gray-800 transition flex items-center justify-center z-50 border-white border-1 "
            aria-label="맨 위로 이동"
    >
        ↑
    </button>
{/if}
