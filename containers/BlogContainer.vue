<template>
    <div>
        <div class="px-4 md:px-32">
            <pages-hero page="Blogs" />
        </div>

        <div class="px-4 md:px-32 py-10">
            <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8 w-full py-8">
                <div v-for="n in 15" :key="n">
                    <div class="shadow hover:shadow-xl rounded-lg group cursor-pointer">
                        <nuxt-link to="/blogs/new-post" class="cursor-pointer">
                            <img :src="image" class="rounded-t-lg" />
                        </nuxt-link>
                        <div class="p-3 pb-4">
                            <nuxt-link to="/blogs/new-post" class="text-xl font-medium group-hover:text-blue-700 text-gray-700 truncate">
                                Latest News Post
                            </nuxt-link>
                            <p class="text-gray-400 text-sm line-clamp-3 my-3">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla cum consequatur iusto porro.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla cum consequatur iusto porro.
                            </p>
                            <nuxt-link to="/blogs/new-post" class="bg-blue-600 text-sm text-white px-3 py-2 rounded">
                                Read More
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import VueFeather from 'vue-feather'
const image = ref('https://t4.ftcdn.net/jpg/01/96/52/31/360_F_196523185_k6LSUluqRnbrVsOskQcujOsxvnhHE87p.jpg')
</script>