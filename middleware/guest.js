import { useAuthStore } from '../stores/auth'
import { isEmpty } from "~/helpers";

export default defineNuxtRouteMiddleware((to, from) => {
    const nuxtApp = useNuxtApp();

    const store = useAuthStore(nuxtApp.$pinia)
    const user = computed(() => store?.getAuthUser || {})

    if(process.client) {
        if(!isEmpty(user.value) && to.path === '/login') {
            return window.location.href = to.path === '/login' ? '/dashboard' : from.path
        }
    }
})