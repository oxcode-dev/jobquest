<template>
    <div class="relative h-full">
        <img src="/assets/img/home-bg.webp" class="hidden md:flex blur-sm brightness-75 w-full h-full" />
        <div class="h-full md:absolute w-full md:top-0 md:bg-opacity-40 bg-blue-800">   
            <div class="h-full flex justify-center items-center px-4 py-6 md:py-0 flex-col w-full md:max-w-3xl mx-auto text-center">
                <h2 class="text-lg leading-normal text-white font-semibold md:text-[34px]">
                    <span class="block">Looking For A Better Job Opportunity?  </span>
                    <span>Join Us And Make Things Happen</span>
                </h2>
                <p class="text-base text-white py-4 font-light">
                    We Can Make Things Happen. Start By Sending Your Resume
                </p>
                <div class="hidden w-full mx-10 rounded bg-white mt-4 sm:mt-10 mb-4">
                    <input class="w-full border-none bg-transparent px-4 py-1 text-gray-400 outline-none focus:outline-none h-12 sm:h-16" type="search" name="search" placeholder="Search Job..." />
                    <button type="submit" class="m-2 rounded bg-blue-600 md:px-4 p-2 text-white inline-flex justify-center items-center">
                        <VueFeather type="search" />
                    </button>
                </div>
                <div class="flex justify-center sm:mt-10 m-6">
                    <nuxt-link to="/jobs" class="m-2 rounded bg-blue-600 md:px-4 p-3 text-white inline-flex justify-center items-center space-x-2">
                        <VueFeather type="search" />
                        <span>Browse Jobs</span>
                    </nuxt-link>
                </div>
                <div class="my-4">
                    <div class="text-white flex flex-wrap items-center text-sm sm:space-x-2" v-if="searches.length > 0">
                        <p>Popular Searches: </p>
                        <ul class="flex space-x-2 flex-wrap">
                            <li v-for="(option, key) in searches" :key="key">
                                <nuxt-link :to="option.icon ? `/jobs/industry/${option.id}` : `/jobs/category/${option.id}`" class="underline">
                                    {{ option.name }}
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import VueFeather from 'vue-feather'
import { useSharesStore } from '../../stores/shares'

const sharesStore = useSharesStore()
const categories = computed(() => sharesStore?.getCategories || [])
const industries = computed(() => sharesStore?.getIndustries || [])

const shuffle = (array) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array; 
}

const searches = computed(() => {
    let categoriesList = categories.value.slice(0, 5)
    let industriesList = industries.value.slice(0, 5)
    return [...categoriesList, ...industriesList]
})


</script>