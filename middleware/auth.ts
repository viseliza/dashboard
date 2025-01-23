export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token')
    token.value = 'ваш-токен'
}) 