<template>
    <div>
        <div class="px-4 md:px-32">
            <pages-hero page="About Us" />
        </div>

        <div class="px-4 md:px-32 py-10">
            <div class="w-full sm:flex sm:items-center">
                <div class="w-full order-2">
                    <img src="/assets/img/online-recruitment-process.jpg" />
                </div>
                <div class="w-full order-1">
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-700">Welcome to #1 online jobs platform.</h2>
                    <p class="py-4 text-gray-500 mr-4 text-lg font-medium">
                        We connect qualified professionals like you to their dream jobs and 
                        employers to the best talent to help grow their businesses.
                    </p>
                </div>
            </div>

            <div class="w-full sm:flex py-10">
                <div class="w-full sm:pr-6 pb-8">
                    <img src="/assets/img/about.jpg" />
                </div>
                <div class="w-full text-sm lg:text-base">
                    <h2 class="text-xl sm:text-3xl font-bold text-gray-700">
                        Transforming Human Resources and Productivity With Ease.
                    </h2>
                    <p class="py-2 text-gray-500 mr-4 font-normal">
                        Founded in 2024, JobQuest started as a recruitment and job search platform but has grown 
                        into an all-encompassing career platform offering online career advice, personalised 
                        HR solutions for both individuals and institutions as well as training services for 
                        jobseekers.
                    </p>
                    <p class="py-2 text-gray-500 mr-4 font-normal">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, ratione voluptas ab, reiciendis distinctio magnam incidunt rerum quos facere autem repudiandae illo tempora. In nihil dignissimos sapiente a, sit quisquam.
                    </p>
                    <p class="py-2 text-gray-500 mr-4 font-normal">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, ratione voluptas ab, reiciendis distinctio magnam incidunt rerum quos facere autem repudiandae illo tempora. In nihil dignissimos sapiente a, sit quisquam.
                    </p>
                    <p class="py-2 text-gray-500 mr-4 font-normal">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, ratione voluptas ab, reiciendis distinctio.
                    </p>
                </div>
            </div>

            <div>
                <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8 w-full py-8">
                    <div v-for="(list, key) in aboutList" :key="key">
                        <div class="bg-blue-50 w-full text-gray-500 p-6 shadow relative hover:border hover:border-blue-200">
                            <div class="bg-white w-12 h-12 inline-flex items-center justify-center rounded-lg">
                                <VueFeather :type="list.icon" class="text-blue-500 w-8 h-8" />
                            </div>
                            <div class="py-3">
                                <h2>{{ list?.title || 'N/A' }}</h2>
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
        </div>

        <AboutTeams />
    </div>
</template>

<script setup>
import VueFeather from 'vue-feather'
import { aboutCores } from '~/constants'

const aboutList = ref(aboutCores ?? [])
</script>