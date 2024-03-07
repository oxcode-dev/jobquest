<template>
    <div class="flex justify-between">
        <div>
            <div class="relative group">
                <button @click="showCategory = !showCategory; showIndustry = false" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none">
                    <span class="mr-2">Categories</span>
                    <VueFeather type="chevron-down" class="w-5" />
                </button>
                <div v-if="showCategory" class="w-64 z-50 h-64 absolute left-0 mt-2 rounded-md shadow-lg bg-white p-1 space-y-1">
                    <input v-model="searchCategory" class="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none" type="text" placeholder="Search items" />
                    <div class="h-48 overflow-y-auto">
                        <nuxt-link 
                            v-for="(option, key) in filteredCategories" :key="key"
                            :to="`/jobs/category/${option?.id || null}`" class="block px-4 py-2 border-b border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                        >
                            {{ option.name || 'N/A'}}
                        </nuxt-link>
                    </div>
                </div>
            </div>
            
        </div>

        <div>
            <div class="relative group">
                <button @click="showIndustry = !showIndustry; showCategory = false" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none">
                    <span class="mr-2">Industries</span>
                    <VueFeather type="chevron-down" class="w-5" />
                </button>
                <div v-if="showIndustry" class="w-64 z-50 h-64 absolute right-0 mt-2 rounded-md shadow-lg bg-white p-1 space-y-1">
                    <input v-model="searchIndustry" class="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none" type="text" placeholder="Search items" autocomplete="off">
                    <div class="h-48 overflow-y-auto">
                        <nuxt-link 
                            v-for="(option, key) in filteredIndustries" :key="key"
                            :to="`/jobs/industry/${option?.id || null}`"  class="block px-4 py-2 border-b border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                        >
                            {{ option.name || 'N/A'}}
                        </nuxt-link>
                    </div>
                </div>
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

const filteredCategories = computed(() => {
    if(searchCategory.value) {
        return categories.value
            .filter(n => n.name.toLowerCase().includes(searchCategory.value.toLowerCase()))
            .slice(0, 10)
    }
    return categories.value.slice(0, 10)
})
const filteredIndustries = computed(() => {
    if(searchIndustry.value) {
        return industries.value
            .filter(n => n.name.toLowerCase().includes(searchIndustry.value.toLowerCase()))
            .slice(0, 10)
    }
    return industries.value.slice(0, 10)
})

const showIndustry = ref(false)
const showCategory = ref(false)
const searchCategory = ref(null)
const searchIndustry = ref(null)
</script>