<template>
    <div>
        <div class="bg-blue-50 p-4 md:px-6 mb-4 rounded-lg">
            <h2 class="text-xl font-semibold text-gray-700">Contact Info</h2>
        </div>
        <div class="bg-blue-50 p-4 md:px-6 mb-4 rounded-lg">
            <div class="flex items-center space-x-2 text-gray-700">
                <p>
                    <VueFeather type="map-pin" />
                </p>
                <h4 class="text-base font-semibold">Address</h4>
            </div>
            
            <address class="text-sm font-medium text-gray-500 py-2">
                201, Fake St. Mountain View, San Francisco, California, USA
            </address>
        </div>
        <div class="bg-blue-50 p-4 md:px-6 mb-4 rounded-lg">
            <div class="flex items-center space-x-2 text-gray-700">
                <p>
                    <VueFeather type="phone" />
                </p>
                <h4 class="text-base font-semibold text-gray-700">Phone</h4>
            </div>
            <div class="flex flex-col py-1">
                <a href="tel:+234 807 903 5018" class="text-sm font-medium text-gray-500 py-1">
                    +234 807 903 5018
                </a>
                <a href="tel:+234 807 903 5018" class="text-sm font-medium text-gray-500 py-1">
                    +234 807 903 5018
                </a>
                <a href="tel:+234 807 903 5018" class="text-sm font-medium text-gray-500 py-1">
                    +234 807 903 5018
                </a>
            </div>
        </div>
        <div class="bg-blue-50 p-4 md:px-6 mb-4 rounded-lg">
            <div class="flex items-center space-x-2 text-gray-700">
                <p>
                    <VueFeather type="at-sign" />
                </p>
                <h4 class="text-base font-semibold text-gray-700">Email</h4>
            </div>
            <a href="mailto:mrexcelsam1@gmail.com" class="text-sm font-medium text-gray-500 py-2">
                mrexcelsam1@gmail.com
            </a>
        </div>
    </div>
</template>

<script setup>
import VueFeather from 'vue-feather'
</script>