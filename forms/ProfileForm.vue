<template>
    <form @submit.prevent="handleSubmit(form)">
        <div  class="py-2">
            <label class="text-sm font-medium text-gray-500">First Name</label>
            <input :class="inputClass" name="first_name" required v-model="form.first_name" />
        </div>
        <div  class="py-2">
            <label class="text-sm font-medium text-gray-500">Last Name</label>
            <input :class="inputClass" name="last_name" required v-model="form.last_name" />
        </div>
        <div class="py-2">
            <label class="text-sm font-medium text-gray-500">Phone</label>
            <input :class="inputClass" name="phone" required v-model="form.phone" />
        </div>
        <div class="py-2">
            <label class="text-sm font-medium text-gray-500">Location</label>
            <input :class="inputClass" name="address" required v-model="form.location" />
        </div>
        <div class="py-2">
            <label class="text-sm font-medium text-gray-500">Portfolio</label>
            <input :class="inputClass" type="url" required v-model="form.portfolio" />
        </div>
        <div class="py-4">
            <button :disabled="isLoading" class="bg-blue-600 w-full text-white px-4 py-3">
                {{ isLoading ? 'Loading...' : 'Save Changes' }}
            </button>
        </div>
    </form>
</template>

<script setup>
import { useProfileForm } from '../hooks/dashboard/profile'
const inputClass = ref('block w-full h-10 bg-transparent border rounded border-gray-400 my-1 p-2 focus:outline-none')

const {user, handleSubmit, isLoading, error} = useProfileForm()
const form = ref({
    first_name: user.value?.first_name || null,
    last_name: user.value?.last_name || null,
    phone: user.value?.phone || null,
    portfolio: user.value?.portfolio || null,
    location: user.value?.location || null,
})
</script>