<template>
    <div class="px-4 md:px-32 py-16 w-full bg-gray-100">
        <div class="text-center pb-6">
            <h2 class="text-3xl py-3">
                Testimonials
            </h2>
            <p class="text-gray-500">
                What Applicants & Recruiters Says About Us.
            </p>
        </div>
        <div class="w-full mx-auto md:max-w-2xl bg-white shadow">
            <div class="p-8 pb-16 md:p-16 h-full flex flex-col items-center justify-center text-gray-600 relative overflow-x-hidden ">
                <svg class="w-12 text-gray-400 fill-current opacity-30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z"/></svg>
                <div class="my-6 h-full w-full relative">
                    <div v-for="n in 4" :key="n" :class="`absolute h-full w-full transition-transform duration-[1.2s] ease-[ease-in-out] ${activeQuote === n ? 'translate-x-[0%]' : 'translate-x-[100%] opacity-0'}`">
                        <p class="text-sm text-gray-500">
                            {{ n }}Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, ea sint in quod blanditiis id explicabo tempore ipsam velit! Quibusdam eius eaque quam laudantium dolorem. Ut expedita repellat aperiam voluptatibus.
                        </p>
                        <p class="text-right text-gray-500 mt-2">
                            <span class="block text-sm font-medium">Lionel Messi</span>
                            <span class="font-normal text-xs">CEO Lionel Inc</span>
                        </p>
                    </div>
                </div>
                <div class="pt-48 md:pt-32">
                    <div class="flex space-x-4 items-center">
                        <a href="#" @click.prevent="activeQuote = key+1" v-for="(image, key) in people" :key="key">
                            <img 
                                :src="image" 
                                :class="`${activeQuote === key+1 ? 'w-12 h-12 shadow-lg border-blue-500 border-2' : 'w-10 h-10'} object-cover rounded-full hover:shadow`"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import VueFeather from 'vue-feather'
const activeQuote = ref(1)
const people = [
    'https://img.freepik.com/free-photo/portrait-dark-skinned-cheerful-woman-with-curly-hair-touches-chin-gently-laughs-happily-enjoys-day-off-feels-happy-enthusiastic-hears-something-positive-wears-casual-blue-turtleneck_273609-43443.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZpqORw76-Yu2bgyxKbDfVwzWWlWcQiqv_r89nnwgnACbuOQ_hflqBUotzRjDUA-Km0kc&usqp=CAU',
    'https://img.freepik.com/free-photo/love-care-concept-cheerful-lovely-woman-makes-korean-like-sign-keeps-tip-thumb-index-finger-near-face-demonstares-mini-heart-smiles-friendly-has-ginger-har-stands-indoor_273609-27887.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDBZI8DiBjgnTnimeQbEP9DMW6e68hHjvCLu67LPmnZHqEDWn5jI7VNkjhg3jc57yq1tE&usqp=CAU',
]

const nextSlide = () => {
    activeQuote.value = activeQuote.value < 4 ? activeQuote.value + 1 : 1
}

onMounted(() => {
    setInterval(nextSlide, 8000)
})
</script>