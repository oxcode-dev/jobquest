<template>
    <div>
        <HomeHero />

        <div class="md:px-32 px-4 py-12 w-full">
            <div class="flex items-center justify-between py-8">
                <h2 class="text-xl md:text-3xl">Recent Jobs</h2>
                <div>
                    <nuxt-link to="/jobs" class="rounded font-medium bg-transparent px-4 py-3 text-blue-600 border-blue-600 border rounded-sm text-sm">
                        Browse Jobs
                    </nuxt-link>
                </div>
            </div>
            <Suspense v-if="isLoading">
                <Loader />
            </Suspense>

            <div v-else>
                <div class="py-4 grid sm:grid-cols-2 md:grid-cols-3 gap-8 w-full" v-if="!isLoading && jobs.length > 0">
                    <div v-for="(job, key) in jobs" :key="key" class="py-2">
                        <JobCard :job="job" />
                    </div>
                </div>
                <div v-else>
                    <EmptyState />
                </div>
            </div>
        </div>

        <HomeBenefits />

        <HomePartners />

        <div class="bg-cover h-[calc(60vh)] min-h-[400px] w-full bg-no-repeat bg-center relative bg-fixed" style="background-image: url('https://fellow.app/wp-content/uploads/2020/07/How-to-take-board-meeting-minutes.jpg');">
            <div class="bg-gray-800 h-full w-full bg-opacity-30 absolute"></div>
            <div class="relative z-50 text-white flex flex-col justify-center h-full items-center space-y-6">
                <h2 class="text-3xl md:text-5xl font-semibold leading-7 pb-2">Your Dream Job</h2>
                <p class="text-3xl font-medium leading-3 py-2">Awaits you.</p>
                <div class="py-4">
                    <button class="bg-white px-6 py-3 text-gray-700">
                        Browse Job
                    </button>
                </div>
            </div>
        </div>
        <HomeTestimonials />
    </div>
</template>

<script setup>
import VueFeather from 'vue-feather'
import { o_O } from '~/helpers';
import { useGetJobs } from '../hooks/jobs/useJobs';

const { getJobsLimit } = useGetJobs()
const isLoading = ref(true)
const jobs = ref([])

const fetchJobs = async() => {
    isLoading.value = true
    let [error, data] = await o_O(getJobsLimit('jobs'))

    if(error) {
        isLoading.value = false
        return console.log(error)
    }
    isLoading.value = false
    jobs.value = data
} 


onBeforeMount(() => {
    fetchJobs()
})
</script>