<template>
    <div class="p-4 md:p-6 border-b">
        <div>
            <h2>Dashboard</h2>
        </div>
    </div>
    <div class="py-8 p-6">
        <div class="px-4 md:px-8">
            <ProfileForm />
        </div>
    </div>
</template>

<script setup>
import ProfileForm from '../../forms/ProfileForm.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
  title: 'Login - JobQuest',
})
</script>
  