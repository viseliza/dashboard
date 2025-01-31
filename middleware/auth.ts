import { Tokens } from "~/models"

export default defineNuxtRouteMiddleware(async (to, from) => {
    const tokens = Tokens.getTokens();
    
    if (to.path === '/login' && tokens.access_token && tokens.refresh_token) {
        console.log("redirect - To Dashboard");
        return await navigateTo('/dashboard');
    }

    if (to.path !== '/login' && !tokens.access_token && !tokens.refresh_token) {
        console.log("redirect - To Login");
        return await navigateTo('/login');
    }
});