<script lang="ts">
    import { onMount } from "svelte";
    import CategorySelector from "../../../components/CategorySelector.svelte";
    import ResourceCard from "../../../components/ResourceCard.svelte";
    import ScrollToTopButton from "../../../components/ScrollToTopButton.svelte";

    let categories = ["프로그래밍", "디자인", "논문", "문서"];
    let selectedCategory = categories[0];

    let allResources = Array.from({length: 1000}, (_, i) => ({
        title: `자료 ${i + 1}`,
        date: `2025-08-${(i % 30 + 1).toString().padStart(2,'0')}`,
        views: Math.floor(Math.random() * 1000),
        imgSrc: "https://picsum.photos/200/300",
        category: categories[i % categories.length],
        price: 5000
    }));

    $: top4 = [...allResources].sort((a,b) => b.views - a.views).slice(0,4);

    let pageSize = 8;
    let offset = 0;
    let loadedResources: typeof allResources = [];

    $: filteredResources = allResources.filter(r => r.category === selectedCategory);

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


    onMount(() => {
        const handleScroll = () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight ) {
                loadMore();
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });
</script>

<div class="w-[90%] mx-auto mt-10">
    <h1 class="text-4xl font-bold text-right">유료</h1>
    <section class="mb-10">
        <h2 class="text-3xl font-bold text-white mb-6">인기 TOP4</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {#each top4 as resource}
                <ResourceCard {...resource} />
            {/each}
        </div>
    </section>

    <CategorySelector
            {categories}
            selectedCategory={selectedCategory}
            onSelect={(cat) => selectedCategory = cat}
    />

    <section class="mt-6">
        <h2 class="text-3xl font-bold text-white mb-6">{selectedCategory} 자료</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {#each loadedResources as resource}
                <ResourceCard {...resource} />
            {/each}
        </div>
    </section>
    <ScrollToTopButton />

</div>
