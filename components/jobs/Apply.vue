<template>
    <div>
        <form @submit.prevent="submit">
            <div class="w-full flex flex-wrap md:flex-nowrap md:space-x-4">
                <div v-if="error" class="bg-red-50 text-red-600 px-2 border-l-4 border-red-600 py-3 w-full">
                    <span class="text-sm font-medium">{{ error }}</span>
                </div>
            </div>

            <div class="py-2">
                <label class="text-sm font-medium text-gray-500">Website/Portfolio Link</label>
                <input :class="inputClass" type="url" required v-model="form.portfolio" />
            </div>
            <div class="py-2">
                <label class="text-sm font-medium text-gray-500">Cover Letter</label>
                <textarea :class="textareaClass" rows="5" required v-model="form.cover_letter"></textarea>
            </div>
            <FileUpload v-model="form.file" />
            <div class="py-4">
                <button :disabled="isLoading" class="bg-blue-600 text-white px-4 py-3">
                    {{ !isLoading ? 'Apply Now' : 'Loading...' }}
                </button>
            </div>
        </form>
    </div>
</template>


<script setup>
// import VueFeather from 'vue-feather'
import { useAppliedJob } from '../../hooks/jobs/useAppliedJob'

const inputClass = ref('block w-full h-10 bg-transparent border rounded border-gray-400 my-1 p-2 focus:outline-none')
const textareaClass = ref('block w-full bg-transparent border rounded border-gray-400 my-1 p-2 focus:outline-none')

const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
    job: {
        type: Object,
        required: true,
    },
})

const { isLoading, error, applyForJob} = useAppliedJob()

const form = ref({
    first_name: props.user?.first_name || '',
    last_name: props.user?.last_name ||'',
    email: props.user?.email || '',
    phone: props.user?.phone ||'',
    portfolio: props.user?.portfolio || '',
    cover_letter: '',
    user_id: props.user?.id || '',
    job_id: props.job?.id || '',
    file: null,
})

const submit = async() => {
    if(props.job?.id && props.user?.id && form.value.file && form.value.cover_letter) {
        applyForJob(form.value)
    }
}
</script>