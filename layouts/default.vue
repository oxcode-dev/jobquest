<template>
    <div class="relative">
        <Header :active="headerActive" @toggle="headerActive = $event" />
        <div class="mt-20 md:mt-0">
            <slot />
        </div>
        <Footer />

        <div id="button_box" ref="button_box" class="hidden fixed bottom-6 right-6">
            <a href="#" @click.prevent="topFunction"  class="inline-flex bg-blue-600 p-2 justify-center items-center text-white rounded-full">
                <VueFeather type="chevron-up" />
            </a>
        </div>
    </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import VueFeather from 'vue-feather'

import { onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "~/stores/auth";
import { useJobsStore } from "~/stores/jobs";
import { useFirebaseDB } from "~/composables/useFirebaseDB";
import {o_O} from '~/helpers'

const { $auth } = useNuxtApp()

const authStore = useAuthStore()
const jobsStore = useJobsStore()
const { getDataWhereKeyValue } = useFirebaseDB()

const button_box = ref(null)
const headerActive = ref(false)

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

onMounted(() => {
    window.onscroll = () => {
        const button_box = document.getElementById('button_box')
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            button_box.classList.remove('hidden')
        } else {
            button_box.classList.add('hidden')
        }
    
        const header_div = document.getElementById('header_div')
        if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
            header_div.classList.add('fixed')
            header_div.classList.add('w-full')
            header_div.classList.add('top-0')
        } else {
            header_div.classList.remove('fixed')
            header_div.classList.remove('w-full')
            header_div.classList.remove('top-0')
        }
    }
})

const getSavedJobs = async(user_id) => {
    if(user_id) {
        let [error, data] = await o_O(getDataWhereKeyValue('saved_jobs', 'user_id', user_id))
        if(!error){
            jobsStore.addSavedJobs(data)
        }
    }
}

onMounted(() => {
    onAuthStateChanged($auth, async (user) => {
        if(user && user.uid !== '') {
            let [error, data] = await o_O(getDataWhereKeyValue('talents', 'uid', user.uid))
            if(error) {
                return console.log(error, data)
            }
            await getSavedJobs(data[0].id)
            authStore.saveAuthUserDetail(data[0])
            authStore.saveAuthUser(user)
        }
    })
})

useHead({
    bodyAttrs: {
        'data-aos-easing': 'slide',
        // 'data-aos-delay': '0',
        'data-aos-duration': 800,
    },
    script: [
        { src: 'https://cdn.tailwindcss.com' },
    ],
});
</script>