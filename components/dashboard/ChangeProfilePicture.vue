<template>
    <Modal :show="show" maxWidth="md" @close="closeModal">
        <div class="p-4 py-3 flex justify-between items-center border-b border-gray-100">
            <p class="text-lg font-medium text-gray-500">Change Your Profile Picture</p>
            <a href="#" class="text-gray-500">
                <VueFeather type="x" class="w-5" />
            </a>
        </div>
        <div class="p-4 md:py-8">
            <form @submit.prevent="handleSubmit">
                <div class="relative mx-auto w-32 h-32 border border-dashed rounded-full flex justify-center items-center">
                    <img class="absolute w-full h-full object-cover rounded-full opacity-60" :src="imagePreview" v-if="imagePreview" />
                    <div class="bg-white text-center text-gray-800 inline-flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                        <span class="text-xs">Upload an Image</span>
                    </div>
                    <input 
                        type="file" class="absolute w-full h-full cursor-pointer opacity-0 " 
                        ref="input" @change="uploadImage"
                    />
                </div>

                <div class="flex justify-center">
                    <button :disabled="isLoading" type="submit" class="transition duration-200 bg-blue-700 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white px-4 py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block mt-6">
                        <span>{{ isLoading ? 'Loading...' : 'Submit' }}</span>
                    </button>
                </div>
            </form>
        </div>
        
    </Modal>
</template>

<script setup>
import VueFeather from 'vue-feather'
import { useProfileForm } from '../../hooks/dashboard/profile'

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false
    }
})
const emit = defineEmits(['close'])

const { isLoading, uploadProfilePicture } = useProfileForm()
const imageArray = ref(null)
const preview = ref(null)
const uploadImage = (e) => {
    imageArray.value = e.target.files[0]
    var reader = new FileReader();
    reader.onload = function(){
      preview.value = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
}
const imagePreview = computed(() => preview.value)

const closeModal = () => emit('close', false)

const handleSubmit = async() => {
    if (imageArray.value !== null) {
        await uploadProfilePicture(imageArray.value)
        closeModal()
    }
}
</script>