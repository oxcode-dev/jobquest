<template>
    <header ref="header_div" class="w-full bg-white px-12 py-4 z-[500] md:flex hidden shadow" id="header_div">
        <nav class="flex justify-between items-center w-full">
            <nuxt-link to="/" class="w-40">
                <Logo />
            </nuxt-link>
            <div>
                <ul class="flex">
                    <li v-for="(nav, key) in navs" :key="key" class="px-2 py-4 text-base">
                        <nuxt-link 
                            :to="nav.link" 
                            class="text-gray-600 p-3 font-normal text-sm hover:text-blue-700 hover:border-b-2 hover:font-medium hover:border-blue-700"
                            :class="getFolderPath === nav.label ? 'text-blue-700 border-b-2 font-medium border-blue-700' : 'text-gray-600'"
                        >
                            {{ nav.name }}
                        </nuxt-link>
                    </li>
                </ul>
            </div>
            <div>
                <nuxt-link v-if="isUserDetailsEmpty" to="/login" class="rounded-sm bg-blue-600 px-6 py-3 text-white">Login</nuxt-link>
                <div v-else class="inline-flex items-center space-x-2">
                    <nuxt-link to="/dashboard/">
                        <img
                            :src="user_details?.avatar || imagePlaceholder" 
                            class="w-10 h-10 object-cover object-center border rounded-full"
                        />
                    </nuxt-link>
                    
                    <div class="text-gray-500 text-xs">
                        <nuxt-link to="/dashboard/" class="text-sm font-medium block">
                            Hello, {{ user_details.first_name || 'User' }}
                        </nuxt-link>
                        <a href="#" @click.prevent="signOut">sign out</a>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <header class="block md:hidden bg-white px-4 py-4 z-[500] fixed w-full top-0">
        <nav class="w-full flex justify-between items-center">
            <div class="w-40">
                <nuxt-link to="/">
                    <Logo />
                </nuxt-link>
            </div>
            <div>
                <button @click="changeToggle">
                    <VueFeather type="menu" />
                </button>
            </div>
        </nav>
        <div 
            :class="active ? 'translate-x-[0%]' : 'translate-x-[-100%]'"
            class="bg-white h-full fixed bottom-0 top-0 w-full left-0 transition-transform duration-[0.8s] ease-[ease-in-out]"
        >
            <div class="relative">
                <div class='absolute right-4 top-8'>
                    <a class='w-8' @click.prevent="changeToggle">
                        <VueFeather type="x" />
                    </a>
                </div>
            </div>
            <div class="pt-24">
                <div class="flex flex-col items-center w-full">
                    <div class="w-56">
                        <nuxt-link to="/" @click="changeToggle">
                            <Logo />
                        </nuxt-link>
                    </div>
                </div>
                <ul class="flex flex-col justify-center items-center">
                    <li v-for="(nav, key) in navs" :key="key" class="px-2 py-4 text-base">
                        <nuxt-link :to="nav.link" 
                            @click="changeToggle"
                            class="text-gray-600 p-3 font-medium text-lg hover:text-blue-700 hover:border-b-2 hover:font-medium hover:border-blue-700"
                            :class="getFolderPath === nav.label ? 'text-blue-700 border-b-2 font-medium border-blue-700' : 'text-gray-600'"
                        >
                            {{ nav.name }}
                        </nuxt-link>
                    </li>
                </ul>
                <div class="py-8 pt-12 text-center">
                    <nuxt-link v-if="isUserDetailsEmpty" to="/login" class="rounded-sm bg-blue-600 px-6 py-3 text-white">Login</nuxt-link>
                    <div v-else class="inline-flex items-center space-x-2">
                        <nuxt-link to="/dashboard/">
                            <img
                                :src="user_details?.avatar || imagePlaceholder" 
                                class="w-10 h-10 object-cover object-center border rounded-full"
                            />
                        </nuxt-link>
                        
                        <div class="text-gray-500 text-xs">
                            <nuxt-link to="/dashboard/" class="text-sm font-medium">
                                Hello, {{ user_details.first_name || 'User' }}
                            </nuxt-link>
                            <a href="#" @click.prevent="signOut" class="block text-left">sign out</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import Logo from './Logo.vue'
import VueFeather from 'vue-feather'
import { useRoute } from 'nuxt/app';
import { useAuthStore } from '../stores/auth'
import { isEmpty } from '~/helpers';
import { useFirebaseAuth } from '../composables/useFirebaseAuth'

const route = useRoute()
const authStore = useAuthStore()
const { handleSignOut } = useFirebaseAuth()

const user_details = computed(() => authStore.getUserDetails || {})
const isUserDetailsEmpty = computed(() => isEmpty(user_details.value))
const fullPath = computed(() => route.fullPath)
const getFolderPath = computed(() => fullPath.value.split('/')[1])
const imagePlaceholder = ref('https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg')
const navs = ref([
    {name: 'Home', link: '/', label: '' },
    {name: 'Browse Jobs', link: '/jobs', label: 'jobs'},
    {name: 'About', link: '/about', label: 'about'},
    {name: 'Blogs', link: '/blogs', label: 'blogs'},
    {name: 'Contact', link: '/contact', label: 'contact'},
])

const emit = defineEmits(['toggle'])
const props = defineProps({
    active: {
        type: Boolean,
        default: () => false
    }
})

const changeToggle = () => {
    emit('toggle', !props.active)
}

const signOut = async() => {
    await handleSignOut()
}

const header_div = ref(null)

// onMounted(() => {
//     window.onscroll = () => {
//         console.log('scroll')
//         if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
//             // console.log(header_div.value, 1)
//             header_div.value.classList.add('fixed')
//             header_div.value.classList.add('w-full')
//             header_div.value.classList.add('top-0')
//         } else {
//             // console.log(header_div.value, 2)
//             header_div.value.classList.remove('fixed')
//             header_div.value.classList.remove('w-full')
//             header_div.value.classList.remove('top-0')
//         }
//     }
// })

</script>