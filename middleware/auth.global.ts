import { Tokens } from "~/models"

export default defineNuxtRouteMiddleware((to, from) => {
    const tokens = Tokens.getTokens();
    
    if (to.path === '/dashboard/login' && 
        tokens.access_token && 
        tokens.refresh_token
    ) {
        console.log("redirect - To Dashboard");
        return navigateTo('/dashboard/projects');
    }

    if (
        to.path !== '/dashboard/login' && 
        !tokens.access_token && 
        !tokens.refresh_token
    ) {
        console.log("redirect - To Login");
        return navigateTo('/dashboard/login');
    }
    
    if (
        to.path.split('/').indexOf('dashboard') !== -1 && 
        to.path === '/dashboard/' &&
        tokens.access_token && 
        tokens.refresh_token
    ) {
        return navigateTo('/dashboard/projects')
    }
});