<template>
    <div class="bg-cover bg-no-repeat rounded-md py-20 mt-4 px-4" style="background-image: url('/assets/img/bg-newsletter.svg')">
        <div class="text-white flex justify-center flex-col items-center">
            <h2 class="text-2xl sm:text-3xl text-center font-medium">{{ page }}</h2>
            <div>
                <ul class="inline-flex space-x-2 text-sm">
                    <li class="font-medium">
                        <nuxt-link to="/">Home</nuxt-link>
                    </li>
                    <li>/</li>
                    <li class="text-gray-300 font-light">
                        <span>{{ page }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    page: {
        type: String,
        default: () => 'Page'
    }
})
</script>