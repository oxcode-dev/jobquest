<template>
    <div class="w-full md:max-w-sm -mt-6 sm:-mt-12">
        <form class="w-full" @submit.prevent="handleSubmit()">
            <div class="py-1">
                <h3 class="text-xl md:text-3xl text-gray-800 font-semibold">
                    Join Now
                </h3>
                <p class="text-sm text-gray-500 py-4 pt-2">
                    Stay updated to our job opportunities and get productive.
                </p>
            </div>

            <div v-if="error" class="bg-red-50 text-red-600 px-2 border-l-4 border-red-600 py-3">
                <span class="text-sm font-medium">{{ error }}</span>
            </div>
           
            <div class="py-1">
                <label class="text-sm font-medium text-gray-500">First Name</label>
                <input :class="inputClass" type="text" v-model="form.first_name" name="first_name" required />
            </div>
            <div class="py-1">
                <label class="text-sm font-medium text-gray-500">Last Name</label>
                <input :class="inputClass" type="text" v-model="form.last_name" name="last_name" required />
            </div>
            <div class="py-1">
                <label class="text-sm font-medium text-gray-500">Email</label>
                <input :class="inputClass" type="email" v-model="form.email" required />
            </div>
            <div class="py-1">
                <label class="text-sm font-medium text-gray-500">Phone</label>
                <input :class="inputClass" type="text" v-model="form.phone" name="phone" required />
            </div>
            <div class="py-1">
                <label class="text-sm font-medium text-gray-500">Password</label>
                <div :class="inputClass" class="relative">
                    <input class="w-full h-full bg-transparent focus:outline-none pr-8" v-model="form.password" :type="isPassword ? 'password' : 'text'" required />
                    <a href="#" class="absolute top-3 text-gray-500 right-2" @click="isPassword = !isPassword">
                        <VueFeather :type="isPassword ? 'eye' : 'eye-off'" class="w-6" />
                    </a>
                </div>
            </div>
            <div class="py-1 flex justify-end">
                <div class="py-2 px-4 text-center space-x-1 text-sm text-gray-700">
                    <span>By clicking Agree & Join, you agree to the JoinQuest</span>
                    <nuxt-link to="#" class="text-blue-600 underline ">Term & Condition</nuxt-link>
                </div>
            </div>
            <div class="py-4 font-semibold">
                <button :disabled="isLoading" class="bg-blue-600 text-white px-4 py-3 w-full rounded">
                    {{ isLoading ? 'Loading' : 'Agree & Join' }}
                </button>
            </div>
            <div class="py-2 flex justify-center space-x-1 text-sm text-gray-700">
                <span>Already on JobQuest?</span>
                <nuxt-link to="/login" class="text-blue-600 underline ">Log In</nuxt-link>
            </div>
        </form>
    </div>
</template>

<script setup>
import VueFeather from 'vue-feather'
import { useAuthStore} from '../stores/auth'
import { useFirebaseAuth } from '../composables/useFirebaseAuth'

const authStore = useAuthStore()
const { handleSignUp, isLoading, error  } = useFirebaseAuth()

const inputClass = ref('block w-full h-12 bg-gray-100 border rounded border-gray-200 my-1 p-2 focus:outline-none')
const isPassword = ref(true)

const form = ref({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: null,
})

const handleSubmit = () => {
    if(form.value.first_name && form.value.last_name && form.value.email && form.value.phone && form.value.password){
        handleSignUp(form.value)
    }
}

useHead({
    title: 'Join Now For Better Job Opportunity - JobQuest',
})
definePageMeta({
    layout: 'auth',
    middleware: 'guest',
})
</script>