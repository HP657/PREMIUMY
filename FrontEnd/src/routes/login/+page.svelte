<script lang="ts">
  export let data;
  const { oauthProviders } = data;
  const loginWith = (url: string) => {
    window.location.href = url;
  };
</script>

<h1 class="text-white text-2xl font-bold mb-6 text-center">긴편 로그인</h1>

<div class="flex flex-col items-center justify-center gap-4 max-w-xs mx-auto">
  {#each oauthProviders as provider}
    <button
            onclick={() => loginWith(provider.url)}
            class={`w-full py-2 rounded font-bold text-white ${provider.bg} ${provider.text ?? ''} hover:opacity-90 transition`}
    >
      Sign in with {provider.name}
    </button>
  {/each}
</div>
