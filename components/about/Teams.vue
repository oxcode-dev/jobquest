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
import { teamMemberList } from '~/constants';
const teams = ref(teamMemberList)
</script>