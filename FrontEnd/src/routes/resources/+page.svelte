<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import ResourceCard from "../../components/ResourceCard.svelte";
    import CategorySelector from "../../components/CategorySelector.svelte";
    import ScrollToTopButton from "../../components/ScrollToTopButton.svelte";

    let categories = ["프로그래밍", "디자인", "논문", "문서"];
    let selectedCategory = categories[0];

    // 50개 더미 데이터 생성
    let allResources = Array.from({length: 1000}, (_, i) => ({
        title: `자료 ${i + 1}`,
        date: `2025-08-${(i % 30 + 1).toString().padStart(2,'0')}`,
        views: Math.floor(Math.random() * 1000),
        category: categories[i % categories.length]
    }));

    // 인기 TOP5
    $: top5 = [...allResources].sort((a,b) => b.views - a.views).slice(0,5);

    // Lazy Loading
    let pageSize = 5;
    let offset = 0;
    let loadedResources: typeof allResources = [];

    // 카테고리 필터
    $: filteredResources = allResources.filter(r => r.category === selectedCategory);

    // 카테고리가 바뀌면 offset 초기화하고 첫 페이지 로드
    $: if (filteredResources) {
        offset = 0;
        loadedResources = filteredResources.slice(0, pageSize);
    }

    function loadMore() {
        const next = filteredResources.slice(offset + pageSize, offset + pageSize*2);
        if(next.length) {
            loadedResources = [...loadedResources, ...next];
            offset += pageSize;
        }
    }

    const handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 250 ) {
            loadMore();
        }
    };

    onMount(() => window.addEventListener("scroll", handleScroll));
    onDestroy(() => window.removeEventListener("scroll", handleScroll));
</script>

<div class="w-[90%] mx-auto mt-10">

    <!-- 인기자료 TOP5 -->
    <section class="mb-10">
        <h2 class="text-3xl font-bold text-white mb-6">인기 TOP5</h2>
        <div class="flex flex-col gap-4">
            {#each top5 as resource}
                <ResourceCard {...resource} />
            {/each}
        </div>
    </section>

    <!-- 카테고리 선택 -->
    <CategorySelector
            {categories}
            selectedCategory={selectedCategory}
            onSelect={(cat) => selectedCategory = cat}
    />

    <!-- 선택 카테고리 자료 -->
    <section class="mt-6">
        <h2 class="text-3xl font-bold text-white mb-6">{selectedCategory} 자료</h2>
        <div class="flex flex-col gap-4">
            {#each loadedResources as resource}
                <ResourceCard {...resource} />
            {/each}
        </div>
    </section>
    <ScrollToTopButton />

</div>
