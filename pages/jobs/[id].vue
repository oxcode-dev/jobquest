<template>
    <Suspense v-if="isLoading">
        <Loader />
    </Suspense>
    <div v-else>
        <div class="px-4 md:px-32 pb-4">
            <pages-hero :page="job?.title || 'N/A'" />
        </div>

        <div class="px-4 md:px-32 py-12">
            <div class="flex flex-wrap md:flex-nowrap w-full space-y-8 md:space-y-0 md:space-x-8">
                <div class="w-full">
                    <div class="bg-blue-50 rounded-lg mb-8">
                        <div class="p-4 md:p-8">
                            <div class="w-full flex items-center">
                                <div class="relative w-full">
                                    <h2 class="text-lg md:text-xl font-semibold text-gray-800">{{ job?.title || 'N/A' }}</h2>
                                    <div class="block sm:flex sm:space-x-4 py-1 font-medium">
                                        <div class="w-full sm:w-auto inline-flex items-center space-x-1">
                                            <VueFeather class="w-3 text-gray-400" type="map-pin" />
                                            <span class="text-xs text-gray-400">{{ job?.location || 'N/A' }}</span>
                                        </div>
                                        <div class="w-full sm:w-auto inline-flex items-center space-x-1">
                                            <VueFeather class="w-3 text-gray-400" type="briefcase" />
                                            <span class="text-xs text-gray-400">{{ industry?.name || 'N/A'}}</span>
                                        </div>
                                        <div class="w-full sm:w-auto inline-flex items-center space-x-1">
                                            <VueFeather class="w-3 text-gray-400" type="calendar" />
                                            <span class="text-xs text-gray-400">{{ datetime }}</span>
                                        </div>
                                    </div>
                                    <div class="sm:absolute sm:top-0 sm:right-0 flex items-center space-x-3 mt-4" v-if="!isUserDetailsEmpty">
                                        <button 
                                            @click="handleAddJobToSave"
                                            class="p-2 inline-flex items-center rounded-sm" 
                                            :class="checkIfJobSaved ? 'bg-blue-600 ' : 'bg-blue-100 '"
                                            :title="checkIfJobSaved ? 'Remove From Saved' : 'Add to Saved'"
                                        >
                                            <VueFeather class="w-5 text-blue-600 " type="heart" stroke="none" :fill="checkIfJobSaved ? 'white' : '#2563EB'" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap md:flex-nowrap w-full space-y-8 md:space-y-0 md:space-x-8">
                <div class="w-full md:w-2/3">
                    <div class="bg-blue-50 rounded-lg">
                        <div class="p-4 md:p-6">
                            <dl>
                                <dt class="pb-4">
                                    <p class="text-lg font-medium text-gray-800">Job Description</p>
                                </dt>
                                <dd class="space-y-2 text-sm text-gray-500">
                                    <p>{{ job?.description || 'N/A' }}</p>
                                </dd>

                                <dt class="py-4">
                                    <p class="text-lg font-medium text-gray-800">Responsibility</p>
                                </dt>
                                <dd class="space-y-2 text-sm text-gray-500">
                                    <p>{{ job?.responsibility || 'N/A' }}</p>
                                </dd>
                                <dt class="py-4">
                                    <p class="text-lg font-medium text-gray-800">Qualifications</p>
                                </dt>
                                <dd class="space-y-2 text-sm text-gray-500">
                                    <p>{{ job?.qualification || 'N/A' }}</p>
                                </dd>
                                <dt class="py-4">
                                    <p class="text-lg font-medium text-gray-800">Benefits</p>
                                </dt>
                                <dd class="space-y-2 text-sm text-gray-500">
                                    <p>{{ job?.benefits || 'N/A' }}</p>
                                </dd>
                            </dl>
                        </div>
                    </div>

                    <div class="bg-blue-50 p-4 md:px-8 my-8 rounded-lg hidden md:block">
                        <div v-if="!isUserDetailsEmpty">
                            <div v-if="!checkIfJobApply">
                                <h2 class="text-xl font-semibold">
                                    Start Your Career Today!
                                </h2>
                                <h4 class="text-base font-medium text-gray-600 py-4 pt-2">
                                    Apply for this job. 
                                </h4>
                                <JobsApply :user="user_details" :job="job" />
                            </div>
                            <div class="py-4" v-else>
                                <p class="pb-4 block text-sm">You've already applied for this job. Check another job.</p>
                            </div>
                        </div>
                        <div class="py-4" v-else>
                            <p class="pb-4 block text-gray-500 font-medium text-sm">Log in or Register to Apply for this job</p>
                            <NuxtLink to="/login" class="bg-blue-600 text-white px-4 py-3 w-full rounded">Get Started</NuxtLink> 
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/3 space-y-6">
                    <div class="bg-blue-50 rounded-lg">
                        <div class="p-4 md:p-6 border-b">
                            <p class="text-lg md:text-xl font-semibold text-gray-800">Job Summary</p>
                        </div>
                        <div class="p-4 md:p-6">
                            <ul class="list-disc list-inside">
                                <li v-for="(option, key) in job_summaries" :key="key" class="flex items-center py-2 space-x-1">
                                    <span class="text-gray-500 text-sm">{{ option.title }}:</span>
                                    <span class="text-gray-900 font-medium text-sm">{{ option.value }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="bg-blue-50 rounded-lg">
                        <div class="p-4 md:p-6">
                            <div class="flex space-x-3 items-center">
                                <div>
                                    <div class="border border-gray-300 inline-flex items-center justify-center rounded w-16 h-16">
                                        <img v-if="recruiter?.logo" :src="recruiter.logo" class="w-full object-fit-cover"  />
                                        <VueFeather v-else type="briefcase" class="w-8 text-gray-400" />
                                    </div>
                                </div>
                                <div class="text-gray-500">
                                    <h5 class="text-lg font-medium">{{ recruiter.name || 'N/A' }}</h5>
                                    <p class="text-sm text-truncate line-clamp-2">
                                        {{ recruiter.bio || 'N/A' }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-blue-50 p-4 md:px-8 my-8 rounded-lg md:hidden">
                        <div v-if="!isUserDetailsEmpty">
                            <div v-if="!checkIfJobApply">
                                <h2 class="text-xl font-semibold">
                                    Start Your Career Today!
                                </h2>
                                <h4 class="text-base font-medium text-gray-600 py-4 pt-2">
                                    Apply for this job. 
                                </h4>
                                <JobsApply :user="user_details" :job="job" />
                            </div>
                            <div class="py-4" v-else>
                                <p class="pb-4 block text-gray-500 font-medium text-sm">You've already applied for this job. Check another job.</p>
                            </div>
                        </div>
                        <div class="py-4" v-else>
                            <p class="pb-4 block text-sm">Log in or Register to Apply for this job</p>
                            <NuxtLink to="/login" class="bg-blue-600 text-white px-4 py-3 w-full rounded">Get Started</NuxtLink> 
                        </div>
                    </div>

                    <div class="bg-blue-50 rounded-lg">
                        <div class="p-4 md:p-6">
                            <p class="text-gray-900 font-medium text-sm pb-2">Share this:</p>
                            <div class="">
                                <button class="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                    <i class="fab fa-twitter"></i>
                                </button>
                                <button class="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                    <i class="fab fa-facebook-square"></i>
                                </button>
                                <button class="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                    <i class="fab fa-dribbble"></i>
                                </button>
                                <button class="bg-white text-gray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                    <i class="fab fa-github"></i>
                                </button>
                                <button class="bg-white text-gray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                    <i class="fas fa-copy"></i>
                                </button>
                                <button class="bg-white text-gray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                    <i class="fas fa-link"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import VueFeather from 'vue-feather'
import { o_O, isEmpty } from '~/helpers'
import { useFirebaseDB } from '../../composables/useFirebaseDB'
import { useSharesStore } from '../../stores/shares'
import { useAuthStore } from '../../stores/auth'
import { useAppliedJob } from '../../hooks/jobs/useAppliedJob'
import { useSavedJobs } from '../../hooks/jobs/useSavedJobs'

const sharesStore = useSharesStore()
const authStore = useAuthStore()

const user_details = computed(() => authStore?.getUserDetails || {})
const isUserDetailsEmpty = computed(() => isEmpty(user_details.value))
const categories = computed(() => sharesStore?.getCategories || [])
const industries = computed(() => sharesStore?.getIndustries || [])
const { params } = useRoute() 
const { getDataWithId, convertTimestamp } = useFirebaseDB()

const { appliedJobs } = useAppliedJob()
const { savedJobs, removeSavedJobs, addSavedJob } = useSavedJobs()

const checkIfJobApply = computed(() => {
    let job = appliedJobs.value.find(n => n.job_id === params.id) || {}
    return !isEmpty(job)
})

const category = computed(() => {
    return categories.value.length > 0 
        ? categories.value.find(n => n.id === job.value.category_id)
        : {}
})

const industry = computed(() => {
    return industries.value.length > 0 
        ? industries.value.find(n => n.id === job.value.industry_id)
        : {}
})

const datetime = computed(() => {
    return job.value ? convertTimestamp(job.value.created_at) : 'N/A'
})

const checkIfJobSaved = computed(() => {
    let job = savedJobs.value.find(n => n.job_id === params.id) || {}
    return !isEmpty(job)
})

const isLoading = ref(true)
const job = ref({})
const recruiter = ref({})

const job_summaries = computed(() => [
    { title: 'Publish Date', value: datetime.value },
    { title: 'Vacancy', value: `${job.value?.position_available || 0} ${job.value?.position_available > 1 ? 'Positions' : 'Position' }` },
    { title: 'Type', value: job.value?.job_type || 'N/A' },
    { title: 'Category', value: job.value.category_id ? category.value.name : 'N/A' },
    { title: 'Salary', value: `${job.value?.min_salary || 0} - ${job.value?.max_salary || 0}/year` },
    { title: 'Location', value: job.value?.location || 'N/A' },
])

const getRecruiterDetail = async (id) => {
    let [error, data] = await o_O(getDataWithId('recruiters', id))
    if(error) return console.log(error)
    recruiter.value = data
}

const getJob = async() => {
    if(params?.id) {
        let [error, data] = await o_O(getDataWithId('jobs', params.id))
        if (error) return navigateTo('/404')
        job.value = data
        await getRecruiterDetail(data.recruiter_id)
        isLoading.value = false
        return 
    }
    return navigateTo('/404')
}

const handleAddJobToSave = async() => {
    return checkIfJobSaved.value ? removeSavedJobs(params.id) : addSavedJob(params.id)
}

onBeforeMount(() => {
    getJob()
})
</script>