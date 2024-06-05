<template>
    <div class="p-4 md:p-6 border-b">
        <div>
            <h2>My Saved Jobs</h2>
        </div>
    </div>
    <div class="py-8 p-6">
        <div class="">
            <div class="flex flex-col space-y-6" v-if="!isLoading">
                <div v-for="(job, key) in jobs" :key="key">
                    <DashboardJobCard :job="job" />
                    <!-- <DashboardJobCard :job="job" :is-saved="true" /> -->
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
import DashboardJobCard from '~/components/DashboardJobCard.vue';
import { useSavedJobs } from '../../hooks/jobs/useSavedJobs'

const { isLoading, jobs} = useSavedJobs()

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
  title: 'Login - JobQuest',
})
</script>
  