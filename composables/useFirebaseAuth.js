import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updatePassword, updateEmail, deleteUser } from "firebase/auth"
import { useAuthStore } from "../stores/auth"
import { errorResponse } from '../helpers/FirebaseErrorResponse';
import { ref } from "vue";
import { useFirebaseDB } from "./useFirebaseDB";
import { o_O } from "../helpers";
import { serverTimestamp } from "firebase/firestore";


export const useFirebaseAuth = () => {
    const { $auth } = useNuxtApp()
    const auth = computed(() => $auth)

    const {getDataWhereKeyValue, addData} = useFirebaseDB()
    const user = computed(() => auth.value?.currentUser || {})
    const authStore = useAuthStore()
    const isLoading = ref(false)
    const error = ref('')
    
    const handleSignOut = async() => {
        await signOut($auth).then(() => {
            authStore.clearAuthUser()    
            location.href = '/'
        }).catch((error) => {
            console.log(errorResponse(error.code))
        });
    }

    const handleSignIn = async (email, password) => {
        isLoading.value = true
        let result = null
        try {
            result = await signInWithEmailAndPassword($auth, email, password);
            let [error, data] = await o_O(getDataWhereKeyValue('talents', 'uid', result.user.uid))
            // return console.log(error, data, result)

            if(error || data.length < 1) {
                error.value = error || 'Admin only is allowed'
                isLoading.value = false
                return await handleSignOut()
            }
            isLoading.value = false
            authStore.saveAuthUser(result.user)
            authStore.saveAuthUserDetail(data[0])
            navigateTo('/dashboard/')
        } catch (e) {
            error.value = errorResponse(e.code);
            isLoading.value = false
        }
    }

    const handleSignUp = async (form) => {
        isLoading.value = true
        let result = null

        try {
            result = await createUserWithEmailAndPassword(auth.value, form.email, form.password);
            let formData = {
                first_name: form.first_name,
                last_name: form.last_name,
                email: form.email,
                phone: form.phone,
                uid: result.user.uid,
                created_at: serverTimestamp(),
                updated_at: serverTimestamp(),
            }
            let [error, data] = await o_O(addData('talents', formData))
            console.log(error, data)
            isLoading.value = false
            authStore.saveAuthUser(result.user)
            navigateTo('/dashboard/')
        } catch (e) {
            error.value = errorResponse(e.code);
            isLoading.value = false
        }
    }

    const handleChangePassword = (password) => {
        isLoading.value = true

        updatePassword(user.value, password).then(() => {
            isLoading.value = false
            alert('Password Updated Successfully!!!')
        })
        .catch((error) => {
            isLoading.value = false
            if(error.code === 'auth/requires-recent-login') {
                alert(errorResponse(error.code))
                handleSignOut()
            }

            console.log(errorResponse(error.code))
        });
    }

    const handleUpdateUserEmail = email => {
        isLoading.value = true

        updateEmail(user.value, email).then(() => {
            isLoading.value = false
            return 'Email Updated Successfully!!!'
        }).catch((error) => {
            isLoading.value = false
            if(error.code === 'auth/requires-recent-login') {
                alert(errorResponse(error.code))
                handleSignOut()
            }

            return errorResponse(error.code)
        });
    }

    const handleDeleteUser = () => {
        deleteUser(user.value).then(() => {
            alert('Account Deleted')
            handleSignOut()
        }).catch((error) => {
            if(error.code === 'auth/requires-recent-login') {
                alert(errorResponse(error))
                handleSignOut()
            }
            console.log(errorResponse(error.code));
        });
    }

    return { 
        handleSignUp, handleSignIn, handleSignOut, handleChangePassword, 
        handleUpdateUserEmail, handleDeleteUser, isLoading, error 
    }
} 