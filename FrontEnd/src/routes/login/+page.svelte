<script lang="ts">
  const BACKEND_URL = 'http://localhost:3000'; // NestJS 서버 주소

  const OAUTH_PROVIDERS = [
    { name: "Google", url: `${BACKEND_URL}/api/auth/google`, color: "#4285F4" },
    { name: "GitHub", url: `${BACKEND_URL}/api/auth/github`, color: "#333" },
    { name: "Kakao", url: `${BACKEND_URL}/api/auth/kakao`, color: "#FEE500", textColor: "#000" },
    { name: "Naver", url: `${BACKEND_URL}/api/auth/naver`, color: "#03C75A" }
  ];

  const loginWith = (url: string) => {
    window.location.href = url; // 백엔드 OAuth 진입점으로 리다이렉트
  };
</script>

<h1>Login with OAuth</h1>

<div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px">
  {#each OAUTH_PROVIDERS as provider}
    <button
      on:click={() => loginWith(provider.url)}
      style="
        background-color: {provider.color};
        color: {provider.textColor ?? '#fff'};
        padding: 10px;
        border: none;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
      "
    >
      Sign in with {provider.name}
    </button>
  {/each}
</div>
