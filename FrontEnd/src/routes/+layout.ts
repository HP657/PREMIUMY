import { browser } from '$app/environment';
import { getUserProfile } from '$lib/api';

export const load = async () => {
    if (!browser) return { user: null };
    const user = await getUserProfile();
    return { user };
};
