<template>
    <div class="bg-gray-100 py-12 px-4 md:px-32 w-full">
        <div class="flex items-center justify-between py-8">
            <h2 class="text-3xl">Why JobQuest</h2>
        </div>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
            <div class="w-full" v-for="n in 6" :key="n">
                <div class="bg-white w-full text-gray-500 p-6 shadow relative hover:border hover:border-blue-200">
                    <div class="text-[4em] text-gray-200 right-6 top-0 absolute opacity-30">{{ n }}</div>
                    <div class="bg-gray-100 w-12 h-12 inline-flex items-center justify-center rounded-lg">
                        <VueFeather type="briefcase" class="text-gray-600 w-8 h-8" />
                    </div>
                    <div class="py-3">
                        <h2>Search Infinity Job</h2>
                    </div>
                    <div>
                        <p class="text-sm text-gray-400 font-light">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis sequi facere vel laborum quam dolores ipsam, mollitia.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import VueFeather from 'vue-feather'
</script>