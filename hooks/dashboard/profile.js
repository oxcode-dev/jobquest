import { o_O, slugify } from "~/helpers"
import { useFirebaseDB } from '../../composables/useFirebaseDB'
import { useAuthStore } from '../../stores/auth'
import {
    ref, uploadBytes, getDownloadURL, deleteObject,
} from "firebase/storage";
import { v4 } from 'uuid';
import { computed, ref as vueRef } from 'vue';

export const useProfileForm = () => {
    const { $storage } = useNuxtApp()

    const authStore = useAuthStore()
    const { updateData, getDataWithId } = useFirebaseDB()

    const isLoading = vueRef(false)
    const error = vueRef(null)

    const user = computed(() => authStore.getUserDetails || {})

    const handleSubmit = async (form) => {
        isLoading.value = true
        let [error, data] = await o_O(updateData('talents', form, user.value.id))
        if(error) {
            error.value = error
            return isLoading.value = false
        }
        
        await getUserDetails()
        isLoading.value = false
        error.value = null
    }

    const getUserDetails = async() => {
        let [error, data] = await o_O(getDataWithId('talents', user.value.id))
        if(error) return console.log(error)
        authStore.saveAuthUserDetail(data)
    }

    const updateAvatar = async(url) => {
        let form = {avatar: url}
        let [error, data] = await o_O(updateData('talents', form, user.value.id))
        if(error) return console.log(error)
        await getUserDetails()
    }

    const uploadProfilePicture = async(imageArray) => {
        isLoading.value = true
        const imageRef = ref($storage, `talents/avatar/${imageArray.name + v4()}`);
        await uploadBytes(imageRef, imageArray).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                if(user.value && user.value.avatar) {
                    const deleteImageRef = ref(storage, user.value.avatar);
                    deleteObject(deleteImageRef)
                        .catch(error => console.log(error))
                }
                updateAvatar(url)
                isLoading.value = false
            });
        });
    }

    return { isLoading, error, handleSubmit, user, uploadProfilePicture}
}