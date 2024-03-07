<template>
    <div class="p-4 md:p-6 border-b">
        <div>
            <h2>My Applied Jobs</h2>
        </div>
    </div>
    <div class="py-8 p-6">
        <div class="">
            <div class="flex flex-col space-y-6" v-if="!isLoading">
                <div v-for="(job, key) in jobs" :key="key">
                    <DashboardJobCard :job="job" />
                </div>
                <div v-if="jobs.length === 0">
                    <EmptyState />
                </div>
            </div>
            <div v-if="isLoading">
                <Loader />
            </div>
        </div>
    </div>
</template>

<script setup>
import VueFeather from 'vue-feather'
import DashboardJobCard from '~/components/DashboardJobCard.vue';
import { useAppliedJob } from '../../hooks/jobs/useAppliedJob'

const {isLoading, jobs } = useAppliedJob()

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
  title: 'Login - JobQuest',
})
</script>
  