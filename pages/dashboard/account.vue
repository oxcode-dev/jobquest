<template>
    <div class="p-4 md:p-6 border-b">
        <div>
            <h2>Account Management</h2>
        </div>
    </div>
    <div class="py-4 p-6">
        <div class="">
            <div class="hidden md:flex space-x-4 text-sm">
                <a 
                    :class="tab === 0 ? 'text-white bg-blue-600' : 'text-gray-500'" class="px-2 rounded-lg py-2"
                    href="#" @click.prevent="tab = 0"
                >Change Password</a>
                <a
                    :class="tab === 1 ? 'text-white bg-blue-600' : 'text-gray-500'" class="px-2 rounded-lg py-2"
                    href="#" @click.prevent="tab = 1"
                >Change Email</a>
                <a 
                    :class="tab === 2 ? 'text-white bg-blue-600' : 'text-gray-500'" class="px-2 rounded-lg py-2"
                    href="#" @click.prevent="tab = 2"
                >Delete Account</a>
            </div>
        </div>
        <div class="w-full max-w-sm py-8">
            <ChangePasswordForm v-if="tab === 0" />
            <ChangeEmailForm v-if="tab === 1" />
            <DeleteUserForm v-if="tab === 2" />
        </div>
    </div>
</template>

<script setup>
import VueFeather from 'vue-feather'
import ChangePasswordForm from '~/forms/ChangePasswordForm.vue';
import ChangeEmailForm from '~/forms/ChangeEmailForm.vue';
import DeleteUserForm from '~/forms/DeleteUserForm.vue';

const tab = ref(0)

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
  title: 'Login - JobQuest',
})
</script>
  