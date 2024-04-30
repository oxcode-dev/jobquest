<template>
    <div class="bg-gray-50 translate-y-0 hover:bg-white border p-4 md:p-8 rounded-lg hover:border-blue-200 hover:-translate-y-1">
        <div class="flex flex-wrap justify-between items-center" :title="job?.title || 'N/A'">
            <div class="w-full">
                <!-- <div class="h-16 w-16 border mb-3 rounded-lg">Logo</div> -->
                <div class="w-full">
                    <h2 class="text-xl font-semibold text-gray-800 line-clamp-1 truncate">
                        <nuxt-link :to="`/jobs/${job?.id || ''}`">
                            {{ job?.title || 'N/A' }}
                        </nuxt-link>
                    </h2>
                    <div class="flex space-x-4 py-1 font-medium">
                        <div class="inline-flex items-center space-x-1">
                            <VueFeather class="w-3 text-gray-400" type="map-pin" />
                            <span class="text-xs text-gray-400 text-truncate">{{ job?.location || 'N/A' }}</span>
                        </div>

                        <div class="inline-flex items-center space-x-1">
                            <VueFeather class="w-3 text-gray-400" type="calendar" />
                            <span class="text-xs text-gray-400 text-truncate">{{ datetime || 'N/A' }}</span>
                        </div>
                    </div>
                    <div class="flex space-x-4 py-1 font-medium">
                        <div class="inline-flex items-center space-x-1">
                            <VueFeather class="w-3 text-gray-400" type="briefcase" />
                            <span class="text-xs text-gray-400">{{ category?.name || 'N/A' }}</span>
                        </div>
                        <div class="inline-flex items-center space-x-1">
                            <VueFeather class="w-3 text-gray-400" type="briefcase" />
                            <span class="text-xs text-gray-400">{{ industry?.name || 'N/A' }}</span>
                        </div>
                    </div>
                    <div class="my-2">
                        <p class="text-xs text-gray-400 line-clamp-3">
                            {{ job?.description || 'N/A' }}
                        </p>
                    </div>
                    <div class="flex space-x-4 py-1">
                        <div class="inline-flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 text-gray-400"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
                            <span class="text-xs text-gray-400">${{ job?.min_salary || 0 }} - {{ job?.max_salary || 0 }}</span>
                        </div>
                        <div class="inline-flex items-center space-x-1">
                            <VueFeather class="w-3 text-gray-400" type="tag" />
                            <span class="text-xs text-gray-400">{{ job?.job_type || 'N/A' }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full relative">
                <div class="absolute top-4" v-if="checkIfJobApplied">
                    <span class="bg-green-600 rounded-md font-medium text-white text-xs p-1">Applied</span>
                </div>
                <div class="flex justify-end items-center space-x-3 mt-4">
                    <button 
                        @click="handleAddJobToSave"
                        class="p-2 inline-flex items-center rounded-sm" 
                        :class="checkIfJobSaved ? 'bg-blue-600 ' : 'bg-blue-100 '"
                        v-if="!isUserDetailsEmpty"
                        :title="checkIfJobSaved ? 'Remove From Saved' : 'Add to Saved'"
                    >
                        <VueFeather class="w-5 text-blue-600 " type="heart" stroke="none" :fill="checkIfJobSaved ? 'white' : '#2563EB'" />
                    </button>
                    <nuxt-link :to="`/jobs/${job?.id || ''}`" class="rounded bg-blue-600 px-4 py-2 text-white rounded-sm text-sm">
                        {{ isUserDetailsEmpty ? 'View' : 'Apply Now' }}
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import VueFeather from 'vue-feather'
import { useSharesStore} from '../stores/shares'
import { useAuthStore} from '../stores/auth'
import { useFirebaseDB } from '../composables/useFirebaseDB';
import { isEmpty, o_O } from '~/helpers'
import { useSavedJobs } from '../hooks/jobs/useSavedJobs'
import { useAppliedJob } from '../hooks/jobs/useAppliedJob'

const authStore = useAuthStore()
const sharesStore = useSharesStore()
const { convertTimestamp } = useFirebaseDB()
const { addSavedJob, removeSavedJobs, savedJobs} = useSavedJobs()
const { appliedJobs } = useAppliedJob()

const categories = computed(() => sharesStore?.getCategories || [])
const industries = computed(() => sharesStore?.getIndustries || [])
const user_details = computed(() => authStore?.getUserDetails || {})
const isUserDetailsEmpty = computed(() => isEmpty(user_details.value))

const checkIfJobSaved = computed(() => {
    let job = savedJobs.value.find(n => n.job_id === props.job.id) || {}
    return !isEmpty(job)
})

const checkIfJobApplied = computed(() => {
    let job = appliedJobs.value.find(n => n.job_id === props.job.id) || {}
    return !isEmpty(job)
})

const category = computed(() => {
    return categories.value.length > 0 
    ? categories.value.find(n => n.id === props.job?.category_id || null)
    : {}
})

const industry = computed(() => {
    return industries.value.length > 0 
    ? industries.value.find(n => n.id === props.job?.industry_id || null)
    : {}
})

const datetime = computed(() => props?.job?.created_at ? convertTimestamp(props.job.created_at) : '')

const handleAddJobToSave = async() => {
    return checkIfJobSaved.value ? removeSavedJobs(props.job.id) : addSavedJob(props.job.id)
}

const props = defineProps({
    job: {
        type: Object,
        default: () => {}
    },
})
</script>