<script lang="ts">
  export let title: string;
  export let date: string;
  export let views: number;
  export let imgSrc: string;
  export let price: number = 0; 
</script>

<div class="bg-gray-800 rounded overflow-hidden shadow-lg cursor-pointer">
    <div class="relative">
        <!-- 이미지 블러 처리 -->
        <img 
            src={imgSrc} 
            alt={title} 
            class={`w-full h-48 object-cover ${price > 0 ? 'filter blur-lg' : ''}`} 
        />

        <!-- 가격 표시 (유료만) -->
        {#if price > 0}
            <div class="absolute inset-0 flex items-center justify-center text-white text-lg font-bold bg-black/40">
                ₩{price.toLocaleString()}
            </div>
        {/if}
    </div>

    <div class="p-4 text-white">
        <h3 class="text-lg font-semibold">{title}</h3>
        <div class="flex justify-between text-sm">
            <span class="text-gray-400">{date}</span>
            <span class="text-yellow-400">조회수 {views}</span>
        </div>
        </div>
</div>
