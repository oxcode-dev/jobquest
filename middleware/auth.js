import { useAuthStore } from '../stores/auth'
import { isEmpty } from "~/helpers";

export default defineNuxtRouteMiddleware(async(to, from) => {
    const nuxtApp = useNuxtApp();

    const store = useAuthStore(nuxtApp.$pinia)
    const user = computed(() => store?.getAuthUser || {})

    if(process.client) {
        if(isEmpty(user.value) && to.path !== '/login') {
            return window.location.href = '/login'
        }
        if(!isEmpty(user.value) && to.path === '/login') {
            return window.location.href = from.path
        }
    }
})