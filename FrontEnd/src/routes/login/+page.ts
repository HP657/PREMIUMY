import type { PageLoad } from './$types';

export const load: PageLoad = () => {
    const BACKEND_URL = 'http://localhost:3000';

    const OAUTH_PROVIDERS = [
        { name: "Google", url: `${BACKEND_URL}/api/auth/google`, bg: "bg-[#4285F4]" },
        { name: "GitHub", url: `${BACKEND_URL}/api/auth/github`, bg: "bg-[#333]" },
        { name: "Kakao", url: `${BACKEND_URL}/api/auth/kakao`, bg: "bg-[#FEE500]", text: "text-black" },
        { name: "Naver", url: `${BACKEND_URL}/api/auth/naver`, bg: "bg-[#03C75A]" }
    ];

    return {
        oauthProviders: OAUTH_PROVIDERS
    };
};
