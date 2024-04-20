<template>
    <div>
        <JobsContainer />
    </div>
</template>

<script setup>
import JobsContainer from '../../containers/JobsContainer.vue'
import { useSharedData } from  '~/hooks/useSharedData'

const {fetchCategories, fetchIndustries} = useSharedData()

onBeforeMount(() => {
    fetchCategories()
    fetchIndustries()
})
</script>