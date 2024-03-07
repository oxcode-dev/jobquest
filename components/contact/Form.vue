<template>
    <div class="bg-blue-50 p-4 md:px-8 md:mr-8 rounded-lg">
        <form>
            <div  class="py-2">
                <label class="text-sm font-medium text-gray-500">Full Name</label>
                <input :class="inputClass" />
            </div>
            <div class="py-2">
                <label class="text-sm font-medium text-gray-500">Email</label>
                <input :class="inputClass" />
            </div>
            <div class="py-2">
                <label class="text-sm font-medium text-gray-500">Phone</label>
                <input :class="inputClass" />
            </div>
            <div class="py-2">
                <label class="text-sm font-medium text-gray-500">Message</label>
                <textarea :class="textareaClass" rows="5"></textarea>
            </div>
            <div class="py-4">
                <button class="bg-blue-600 text-white px-4 py-3">Send Message</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import VueFeather from 'vue-feather'
const inputClass = ref('block w-full h-10 bg-transparent border rounded border-gray-400 my-1 p-2 focus:outline-none')
const textareaClass = ref('block w-full bg-transparent border rounded border-gray-400 my-1 p-2 focus:outline-none')
</script>