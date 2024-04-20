<template>
    <div v-if="isPageLoading">
        <Loader />
    </div>
    <Layout v-else>
        <div class="px-4 md:px-28 xl:px-48 py-8">
            <div class="w-full md:max-w-6xl mx-auto flex flex-wrap md:flex-nowrap md:space-x-5">
                <div class="w-full md:w-1/4">
                    <div class="bg-blue-50 shadow w-full">
                        <div class="flex flex-col items-center w-full py-6 border-b">
                            <div>
                                <img 
                                    :src="user?.avatar || img_placeholder" 
                                    class="w-20 h-20 rounded-full object-cover object-center"  
                                />
                            </div>
                            <div class="text-center">
                                <h2 class="text-xl font-semibold text-gray-500 pt-3">{{ name }}</h2>
                                <a @click.prevent="showModal = true" href="#" class="underline text-sm text-blue-500">
                                    Change Avatar
                                </a>
                            </div>
                        </div>
                        <ul class="hidden md:flex flex-col pb-6">
                            <li class="py-1 w-full" v-for="(nav, key) in navs" :key="key">
                                <nuxt-link 
                                    :class="getFolderPath === nav.link ? 'bg-white font-medium' : ''" 
                                    :to="`/dashboard/${nav.link}`"
                                    class="inline-flex items-center text-blue-500 hover:bg-white w-full space-x-2 p-2.5"
                                >
                                    <VueFeather :type="nav.icon" class="w-5" />
                                    <span>{{ nav.label }}</span>
                                </nuxt-link>
                            </li>
                            <li class="py-1 w-full">
                                <a href="#" @click.prevent="handleSignOut" class="inline-flex items-center text-blue-500 hover:bg-white w-full space-x-2 p-2.5">
                                    <VueFeather type="log-out" class="w-5" />
                                    <span>Sign out</span>
                                </a>
                            </li>
                        </ul>
                        <div class="md:hidden flex justify-center flex-col py-3 px-4">
                            <div>
                                <div class="relative group">
                                    <button @click="showMenu = !showMenu" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none">
                                        <span class="mr-2">Navigation</span>
                                        <VueFeather type="chevron-down" class="w-5" />
                                    </button>
                                    <div v-if="showMenu" class="w-64 z-50 h-auto py-1.5 absolute left-0 mt-2 rounded-md shadow-lg bg-white p-1 space-y-1">
                                        <div class="overflow-y-auto">
                                            <nuxt-link 
                                                @click="showMenu=false"
                                                v-for="(option, key) in navs" :key="key"
                                                :class="getFolderPath === option.link ? 'bg-gray-100 font-medium' : ''" 
                                                :to="`/dashboard/${option.link}`" class="block px-4 py-2.5 border-b border-gray-100 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                                            >
                                                {{ option.label || 'N/A'}}
                                            </nuxt-link>
                                            <a href="#" @click.prevent="handleSignOut" class="block px-4 py-2.5 border-b border-gray-100 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer">
                                                Sign out
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-3/4 pt-8 md:pt-0">
                    <div class="bg-blue-50 shadow">
                        <div class="h-full">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <DashboardChangeProfilePicture :show="showModal" @close="showModal = $event"  />
    </Layout>
</template>

<script setup>
import Layout from './default.vue'
import VueFeather from 'vue-feather'
import { useFirebaseAuth } from '../composables/useFirebaseAuth'
import { useProfileForm } from '~/hooks/dashboard/profile';
import { dashboardNavs } from  '~/constants/dashboard'

const route = useRoute()

const showMenu = ref(false)
const showModal = ref(false)
const img_placeholder = ref('https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg')

const navs = ref(dashboardNavs ?? [])

const fullPath = computed(() => route.fullPath)
const getFolderPath = computed(() => fullPath.value.split('/')[2])

const { user } = useProfileForm()
const name = computed(() => `${user.value.first_name} ${user.value.last_name}`)

const { handleSignOut } = useFirebaseAuth()

const isPageLoading = ref(true)

onBeforeMount(() => {
    setTimeout(() => {
        isPageLoading.value = false
    }, 2000)
})
</script>