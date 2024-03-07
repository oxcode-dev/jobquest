import { o_O } from '~/helpers'
import { useFirebaseDB } from '../composables/useFirebaseDB'
import { useJobsStore } from '../stores/jobs'
import { useAuthStore } from '../stores/auth'
export const useSavedJobs = () => {
    const isLoading = ref(false)
    const error = ref(null)
    const jobs = ref([])
    
    const { addData, getDataWhereKeyValue, deleteData, getDataWhereKeyInValues } = useFirebaseDB()

    const jobsStore = useJobsStore()
    const authStore = useAuthStore()

    const savedJobs = computed(() => jobsStore.getSavedJobs || {})
    const user = computed(() => authStore.getUserDetails || {})

    const getSavedJobs = async() => {
        let [error, data] = await o_O(getDataWhereKeyValue('saved_jobs', 'user_id', user.value.id))
        if(error) {
            return error.value = error
        }
        jobsStore.addSavedJobs(data)
    }

    const addSavedJob = async(job_id) => {
        isLoading.value = true
        let body = {
            job_id: job_id,
            user_id: user.value.id
        }
        let [error, data] = await o_O(addData('saved_jobs', body))
        if(error) {
            return error.value = error
        }
        await getSavedJobs()
        isLoading.value = false
    }

    const removeSavedJobs = async(job_id) => {
        let job = savedJobs.value.find(n => n.job_id === job_id) || {}
        let [error, data] = await o_O(deleteData('saved_jobs', job.id))
        if(!error){
            getSavedJobs()
            getAllSavedJobs()
        }
    }

    const getAllSavedJobs = async () => {
        isLoading.value = true
        let jobIds = savedJobs.value.map(n => n.job_id)
        let [error, data] = await o_O(getDataWhereKeyInValues('jobs', 'id', jobIds))
        // return console.log(error, data)
        if(error) {
            isLoading.value = false
            return error.value = error
        }
        jobs.value = data
        isLoading.value = false
    }
    
    onMounted(() => {
        getSavedJobs()
        getAllSavedJobs()
    })

    return { isLoading, error, addSavedJob, savedJobs, removeSavedJobs, jobs }
}

