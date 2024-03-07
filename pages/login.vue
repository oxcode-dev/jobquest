<template>
    <div class="w-full md:max-w-sm">
        <form class="w-full" @submit.prevent="submit">
            <div class="py-1">
                <h3 class="text-xl md:text-3xl text-gray-800 font-semibold">
                    Log in
                </h3>
                <p class="text-sm text-gray-500 py-4 pt-2">
                    Stay updated to our job opportunities and get productive.
                </p>
            </div>
            <div v-if="error" class="bg-red-50 text-red-600 px-2 border-l-4 border-red-600 py-3">
                <span class="text-sm font-medium">{{ error }}</span>
            </div>
            <div class="py-1">
                <label class="text-sm font-medium text-gray-500">Email</label>
                <input :class="inputClass" type="email" required v-model="form.email" />
            </div>
            <div class="py-1">
                <label class="text-sm font-medium text-gray-500">Password</label>
                <div :class="inputClass" class="relative">
                    <input class="w-full h-full bg-transparent focus:outline-none pr-8" :type="isPassword ? 'password' : 'text'" required v-model="form.password" />
                    <a href="#" class="absolute top-3 text-gray-500 right-2" @click="isPassword = !isPassword">
                        <VueFeather :type="isPassword ? 'eye' : 'eye-off'" class="w-6" />
                    </a>
                </div>
            </div>
            <div class="py-1 flex justify-end">
                <a href="#" class="font-medium text-blue-600">Forgot Password?</a>
            </div>
            <div class="py-4 font-semibold">
                <button :disabled="isLoading" class="bg-blue-600 text-white px-4 py-3 w-full rounded">
                    {{ isLoading ? 'Loading...' : 'Login' }}
                </button>
            </div>
            <div class="py-2 flex justify-center space-x-1 text-sm text-gray-700">
                <span>New to JobQuest?</span>
                <nuxt-link to="/signup" class="text-blue-600 underline ">Join Now</nuxt-link>
            </div>
        </form>
    </div>
</template>

<script setup>
import VueFeather from 'vue-feather'
import { useFirebaseAuth } from '../composables/useFirebaseAuth'

const inputClass = ref('block w-full h-12 bg-gray-100 border rounded border-gray-200 my-1 p-2 focus:outline-none')
const isPassword = ref(true)
const { handleSignIn, error, isLoading } = useFirebaseAuth()

const form = ref({
    email: '',
    password: ''
})

const submit = async () => {
    if(form.value.email && form.value.password) {
        await handleSignIn(form.value.email, form.value.password)
    }
}

useHead({
    title: 'Log In - JobQuest',
})
definePageMeta({
    layout: 'auth',
    middleware: 'guest',
})
</script>