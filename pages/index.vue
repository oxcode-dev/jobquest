<template>
    <HomeContainer />
</template>

<script setup>
import HomeContainer from '../containers/HomeContainer.vue'
import { useSharedData} from '../hooks/useSharedData'

const {fetchCategories, fetchIndustries} = useSharedData()

onBeforeMount(() => {
    fetchCategories()
    fetchIndustries()
})
</script>
   