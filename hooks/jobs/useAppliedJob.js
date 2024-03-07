import { o_O } from '~/helpers'
import { useFirebaseDB } from '../../composables/useFirebaseDB'
import { useJobsStore } from '../../stores/jobs'
import { useAuthStore } from '../../stores/auth'
import {
    ref as baseRef, uploadBytes, getDownloadURL, deleteObject,
} from "firebase/storage";
import { v4 } from 'uuid';

export const useAppliedJob = () => {
    const { $storage } = useNuxtApp()

    const isLoading = ref(false)
    const error = ref(null)
    const jobs = ref([])
    
    const { addData, getDataWhereKeyValue, getDataWhereKeyInValues, serverTimestamp } = useFirebaseDB()

    const jobsStore = useJobsStore()
    const authStore = useAuthStore()

    const appliedJobs = computed(() => jobsStore.getAppliedJobs || {})
    const user = computed(() => authStore.getUserDetails || {})

    const getAppliedJobs = async() => {
        let [error, data] = await o_O(getDataWhereKeyValue('job_applications', 'user_id', user.value.id))
        if(error) {
            return error.value = error
        }
        jobsStore.addAppliedJobs(data)
    }

    const addJobApplication = async(form) => {
        // isLoading.value = true
        let [error, data] = await o_O(addData('job_applications', form))
        if(error) {
            return error.value = error
        }
        await getAllAppliedJobs()
        isLoading.value = false
        location.reload()
    }

    const getAllAppliedJobs = async() => {
        isLoading.value = true
        let jobIds = appliedJobs.value.map(n => n.job_id)
        let [error, data] = await o_O(getDataWhereKeyInValues('jobs', 'id', jobIds))
        // return console.log(error, data)
        if(error) {
            isLoading.value = false
            return error.value = error
        }
        jobs.value = data
        isLoading.value = false
    }

    const applyForJob = async(form) => {
        isLoading.value = true
        const imageRef = baseRef($storage, `jobs/application/${form.file.name + v4()}`);
        await uploadBytes(imageRef, form.file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                form.resume = url
                form.created_at = serverTimestamp()
                form.updated_at = serverTimestamp()
                delete form.file
                addJobApplication(form)
                // isLoading.value = false
            });
        });
    }

    onMounted(() => {
        getAppliedJobs()
        getAllAppliedJobs()
    })

    return { isLoading, error, addJobApplication, appliedJobs, jobs, applyForJob }
}