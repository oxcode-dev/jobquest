<template>
    <div>
        <div class="px-4 sm:px-12 md:px-28 lg:px-32 pb-4">
            <pages-hero :page="pageTitle" />
        </div>

        <div class="px-4 sm:px-12 md:px-28 lg:px-32 pb-8">
            <p class="text-gray-600 font-medium pb-2 underline">Filter:</p>
            <JobsFilter />

            <div class="py-4 w-full">
                <JobsView v-if="!getFolderPath" />
                <JobsCategoryView v-if="getFolderPath === 'category'" />
                <JobsIndustryView v-if="getFolderPath === 'industry'" />
            </div>
            
        </div>
    </div>
</template>

<script setup>
import VueFeather from 'vue-feather'
import { useSharesStore } from '~/stores/shares'

const sharesStore = useSharesStore()

const categories = computed(() => sharesStore.getCategories || [])
const industries = computed(() => sharesStore.getIndustries || [])

const { params, fullPath} = useRoute()

const fullPathDetail = computed(() => fullPath)
const getFolderPath = computed(() => fullPathDetail.value.split('/')[2])

const pageTitle = computed(() => {
    if(getFolderPath.value === 'category' && params?.id) {
        let category = categories.value.find(n => n.id === params.id)
        return `Browse '${category?.name || 'Category'}' Jobs`
    }

    if(getFolderPath.value === 'industry' && params?.id) {
        let industry = industries.value.find(n => n.id === params.id)
        return `Browse '${industry?.name || "Industry"}' Jobs`
    }

    return 'Browse Jobs'
})

</script>