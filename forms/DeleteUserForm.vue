<template>
    <div>
        <form @submit.prevent="deleteUser">
            <div class="my-1 pt-2 pb-8 space-y-4 text-sm text-gray-500">
                <p>Are you sure you want to completely delete your account? This process cannot be reversed.</p>
                <p>Kindly provided your email address to confirm delete.</p>
            </div>

            <div class="my-1">
                <label class="font-semibold text-sm text-gray-600 pb-1 block">Email</label>
                <input type="email" required v-model="form.email" class="border rounded-lg px-3 py-3 mt-1 mb-5 text-sm w-full" />
            </div>

            <button :disabled="isLoading" type="submit" class="transition duration-200 bg-blue-700 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-3 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                <span>
                    {{ isLoading ? 'Loading...' : 'Delete Account' }}
                </span>
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFirebaseAuth } from '../composables/useFirebaseAuth';

const form = ref({
    email: null,
})

const { isLoading, handleDeleteUser} = useFirebaseAuth()
const {$auth} = useNuxtApp()
const user = computed(() => $auth?.currentUser || {})

const deleteUser = () => {
    if(user.value.email === form.value.email){
       handleDeleteUser()
    }
}

</script>