<template>
    <div class="bg-gray-100">
        <div class="px-4 md:px-32 py-16">
            <div class="text-center">
                <h2 class="text-2xl sm:text-4xl font-bold text-gray-700">
                    Meet Our Team
                </h2>
                <p class="py-2 text-gray-500 mr-4 font-normal">
                    JobQuest is led by a multidisciplinary senior management team with extensive experience leading digital transformation.
                </p>
            </div>

            <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8 w-full py-8">
                <div v-for="(team, key) in teams" :key="key" class="">
                    <div class="rounded-lg cursor-pointer hover:shadow-lg  bg-white py-8 p-4 flex flex-col items-center">
                        <div class="pb-6">
                            <img :src="team.image" class="aspect-9/16 object-cover w-40 h-40 rounded-full shadow" />
                        </div>
                        <div class="text-center">
                            <h3 class="text-xl text-gray-700 font-semibold">{{ team.name }}</h3>
                            <p class="text-sm py-2 text-gray-500">{{ team.title }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// import VueFeather from 'vue-feather'

const teams = ref([
    {
        name: 'John Doe',
        title: 'Chief Executive Officer',
        image: 'https://img.freepik.com/free-photo/portrait-dark-skinned-cheerful-woman-with-curly-hair-touches-chin-gently-laughs-happily-enjoys-day-off-feels-happy-enthusiastic-hears-something-positive-wears-casual-blue-turtleneck_273609-43443.jpg',
    },
    {
        name: 'Samuel Osemeke',
        title: 'Head, Customer Experience & Operations',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZpqORw76-Yu2bgyxKbDfVwzWWlWcQiqv_r89nnwgnACbuOQ_hflqBUotzRjDUA-Km0kc&usqp=CAU',
    },
    {
        name: 'Erling Halaand',
        title: 'Head, Finance',
        image: 'https://img.freepik.com/free-photo/love-care-concept-cheerful-lovely-woman-makes-korean-like-sign-keeps-tip-thumb-index-finger-near-face-demonstares-mini-heart-smiles-friendly-has-ginger-har-stands-indoor_273609-27887.jpg',
    },
    {
        name: 'Davide Silva',
        title: 'Head, Youth Engagement',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDBZI8DiBjgnTnimeQbEP9DMW6e68hHjvCLu67LPmnZHqEDWn5jI7VNkjhg3jc57yq1tE&usqp=CAU',
    },
    {
        name: 'Jane Doe',
        title: 'Head, Accounting',
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww'
    },
    {
        name: 'Emmanuel Flavour',
        title: 'Head, People & Culture',
        image: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D'
    },

])
</script>