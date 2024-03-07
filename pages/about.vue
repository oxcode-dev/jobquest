<template>
    <AboutContainer />
</template>

<script setup>
import AboutContainer from '../containers/AboutContainer.vue'
import { useFirebaseDB } from '../composables/useFirebaseDB'

const { getAllData } = useFirebaseDB()

onMounted(() => {
    getAllData('faqs')
})
</script>
  