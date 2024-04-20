<template>
    <div>
        <Suspense v-if="isLoading">
            <Loader />
        </Suspense>
        <div class="pb-8" v-if="!isLoading">
            <div class="py-4 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 w-full" v-if="jobs.length > 0">
                <div v-for="(job, key) in jobs" :key="key" class="py-2">
                    <JobCard :job="job" />
                </div>
            </div>
            <div v-else>
                <EmptyState />
            </div>
        </div>
    </div>
</template>

<script setup>
import { o_O } from '~/helpers';
import { useFirebaseDB } from '~/composables/useFirebaseDB'

const { getDataWhereKeyValue } = useFirebaseDB()
const jobs = ref([])
const isLoading = ref(true)
const { params } = useRoute() 

const fetchJobs = async() => {
    let [error, data] = await o_O(getDataWhereKeyValue('jobs', 'category_id', params.id))

    if(error) {
        return console.log(error) 
    }
    jobs.value = data
    isLoading.value = false
}

onBeforeMount(() => {
    fetchJobs()
})
</script>