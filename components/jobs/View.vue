<template>
    <div>
        <Suspense v-if="isLoading">
            <Loader />
        </Suspense>
        <div class="pb-8" v-if="!isLoading">
            <div v-if="allData.length > 0">
                <div class="py-4 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 w-full">
                    <div v-for="(job, key) in allData" :key="key" class="py-2">
                        <JobCard :job="job" />
                    </div>
                </div>
                <div class="border rounded-lg shadow my-6 flex justify-between items-center py-5 px-2 md:px-4">
                    <div v-if="pages > 0">
                        <p v-html="pageTitle"></p>
                    </div>
                    <div class="flex space-x-4">
                        <button v-if="currentPage > 1" @click="handlePrevPage(currentPage - 1)" class="rounded-lg bg-gray-100 text-gray-600 px-2 py-1 w-20 border text-sm">
                            Prev
                        </button>
                        <button v-if="currentPage < pages" @click="handleNextPage(currentPage + 1)" class="rounded-lg bg-gray-100 text-gray-600 px-2 py-1 w-20 border text-sm">
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <div v-else>
                <EmptyState />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useJobs } from '../../hooks/jobs/useJobs';

const { pageTitle, pages, currentPage, handleNextPage, handlePrevPage, allData, isLoading } = useJobs()

</script>